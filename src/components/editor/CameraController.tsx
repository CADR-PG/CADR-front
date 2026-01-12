import { PerspectiveCamera, useHelper } from '@react-three/drei';
import * as THREE from 'three';
import { Camera } from '../../engine/components/Camera';
import useEntityManager from '../../hooks/useEntityManager';
import ControllerProps from '../../types/ControllerProps';
import { useEditorContext } from '../../hooks/useEditorContext';
import { useRef } from 'react';
import TransformControlsController from './TransformControlsController';
export default function CameraController({ entity }: ControllerProps) {
  const em = useEntityManager();
  const camera = em.getComponent(Camera, entity);
  const { running } = useEditorContext();
  const cameraRef = useRef<THREE.PerspectiveCamera>(null!);
  useHelper(!running && cameraRef, THREE.CameraHelper);

  return (
    camera && (
      <TransformControlsController entity={entity} meshRef={cameraRef}>
        <PerspectiveCamera
          makeDefault={running}
          ref={cameraRef}
          args={[camera.fov, camera.aspect, camera.near, camera.far]}
        ></PerspectiveCamera>
      </TransformControlsController>
    )
  );
}
