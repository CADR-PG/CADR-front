import {
  PerspectiveCamera,
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

export default function CameraController({ entity }: ControllerProps) {
  const em = useEntityManager();
  const camera = em.getComponent(Camera, entity);
  const transform = em.getComponent(Transform, entity);
  const { running, focused, editingMode, drag } = useEditorContext();
  const cameraRef = useRef<THREE.PerspectiveCamera>(null!);
  useHelper(!running && cameraRef, THREE.CameraHelper);

  // Keep the camera synced to the ECS transform at all times, the same way
  // MeshController binds its mesh's position/rotation straight from the
  // transform - Play mode loads a freshly-cloned game scene with brand new
  // entities, so the camera has no prior position to fall back on and must
  // be placed from its Transform component on mount, same as every other
  // entity. A script that wants to move the camera should do so through the
  // ECS Transform component, which will flow through here like any other
  // entity's mesh.
  const [px, py, pz] = transform?.position ?? [0, 0, 0];
  const [rx, ry, rz] = transform?.rotation ?? [0, 0, 0];
  useLayoutEffect(() => {
    const mesh = cameraRef.current;
    if (!mesh) return;
    mesh.position.set(px, py, pz);
    mesh.rotation.set(rx, ry, rz);
  }, [px, py, pz, rx, ry, rz]);

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

  return (
    camera && (
      <>
        <PerspectiveCamera
          makeDefault={running}
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
      </>
    )
  );
}
