import {
  PerspectiveCamera,
  PointerLockControls,
  TransformControls,
  useHelper,
} from '@react-three/drei';
import * as THREE from 'three';
import { Camera } from '../../engine/components/Camera';
import MainCamera from '../../engine/components/MainCamera';
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
  const isMain = em.has(MainCamera, entity);
  const transform = em.getComponent(Transform, entity);
  const { running, focused, editingMode, drag } = useEditorContext();
  const cameraRef = useRef<THREE.PerspectiveCamera>(null!);
  const active = running && isMain;
  useHelper(!running && cameraRef, THREE.CameraHelper);
  usePlayerMovement(cameraRef, active);

  // Play-mode movement (WASD + mouse-look) mutates the camera object
  // directly and never touches the ECS, so the object can't take its
  // transform from props. Instead, whenever we're in edit mode, apply the
  // ECS transform imperatively: this picks up Inspector edits, and after
  // Stop (the scene is restored from the pre-Play copy) it puts the camera
  // back where it was, just like every other entity.
  const [px, py, pz] = transform?.position ?? [0, 0, 0];
  const [rx, ry, rz] = transform?.rotation ?? [0, 0, 0];
  useLayoutEffect(() => {
    const mesh = cameraRef.current;
    if (running || !mesh) return;
    mesh.position.set(px, py, pz);
    mesh.rotation.set(rx, ry, rz);
  }, [running, px, py, pz, rx, ry, rz]);

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
  }, [running]);

  return (
    camera && (
      <>
        <PerspectiveCamera
          makeDefault={active}
          ref={cameraRef}
          // aspect is kept in sync with the canvas size by drei itself
          fov={camera.fov}
          near={camera.near}
          far={camera.far}
        />
        {!running && focused === entity && (
          <TransformControls
            object={cameraRef}
            mode={editingMode}
            onMouseDown={() => drag(true)}
            onMouseUp={() => drag(false)}
            onObjectChange={persistTransform}
          />
        )}
        {active && <PointerLockControls selector=".canvas" />}
      </>
    )
  );
}
