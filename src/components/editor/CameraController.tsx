import {
  PerspectiveCamera,
  PointerLockControls,
  TransformControls,
  useHelper,
} from '@react-three/drei';
import * as THREE from 'three';
import { Camera } from '../../engine/components/Camera';
import Transform from '../../engine/components/Transform';
import { ECS } from '../../engine/ECS';
import useEntityManager from '../../hooks/useEntityManager';
import ControllerProps from '../../types/ControllerProps';
import { useEditorContext } from '../../hooks/useEditorContext';
import { useLayoutEffect, useRef } from 'react';
import usePlayerMovement from '../../hooks/usePlayerMovement';

export default function CameraController({ entity }: ControllerProps) {
  const em = useEntityManager();
  const camera = em.getComponent(Camera, entity);
  const { running, focused, editingMode } = useEditorContext();
  const cameraRef = useRef<THREE.PerspectiveCamera>(null!);
  const seeded = useRef(false);
  const wasRunning = useRef(running);
  useHelper(!running && cameraRef, THREE.CameraHelper);
  usePlayerMovement(cameraRef, running);

  // The camera object stays mounted continuously (no more wrapping
  // TransformControls group) - so its transform must be seeded from the
  // ECS exactly once, right after it's created. After that, the gizmo
  // drag, WASD movement and mouse-look all own the live transform
  // directly; nothing re-applies it on every render.
  useLayoutEffect(() => {
    seeded.current = false;
  }, [entity]);

  useLayoutEffect(() => {
    const mesh = cameraRef.current;
    const transform = ECS.instance.entityManager.getComponent(
      Transform,
      entity,
    );
    if (!mesh || !transform || seeded.current) return;
    mesh.position.set(...transform.position);
    mesh.rotation.set(...transform.rotation);
    seeded.current = true;
  });

  const persistTransform = () => {
    const mesh = cameraRef.current;
    const transform = ECS.instance.entityManager.getComponent(
      Transform,
      entity,
    );
    if (mesh && transform) {
      transform.position = [mesh.position.x, mesh.position.y, mesh.position.z];
      transform.rotation = [mesh.rotation.x, mesh.rotation.y, mesh.rotation.z];
    }
  };

  useLayoutEffect(() => {
    // Pressing Escape (browser default) or stopping play mode should release
    // the mouse, otherwise the cursor stays locked/hidden in edit mode.
    if (!running && document.pointerLockElement) {
      document.exitPointerLock();
    }

    // Play-mode movement (WASD + mouse-look) mutates the camera directly but
    // never touches the ECS. Persist it when stopping, otherwise the next
    // Play would start from wherever it was before this session began.
    if (wasRunning.current && !running) {
      persistTransform();
    }
    wasRunning.current = running;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running, entity]);

  return (
    camera && (
      <>
        <PerspectiveCamera
          makeDefault={running}
          ref={cameraRef}
          args={[camera.fov, camera.aspect, camera.near, camera.far]}
        />
        {!running && (
          <TransformControls
            object={cameraRef}
            size={entity === focused ? 1 : 0}
            enabled={entity === focused}
            mode={editingMode}
            onObjectChange={persistTransform}
          />
        )}
        {running && <PointerLockControls selector=".canvas" />}
      </>
    )
  );
}
