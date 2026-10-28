import { PerspectiveCamera, useHelper } from '@react-three/drei';
import * as THREE from 'three';
import { Camera } from '../../engine/components/Camera';
import useEntityManager from '../../hooks/useEntityManager';
import ControllerProps from '../../types/ControllerProps';
import { useEditorContext } from '../../hooks/useEditorContext';
import { useRef } from 'react';
import TransformControlsController from './TransformControlsController';
import useComponents from '@/hooks/useComponents';

export default function CameraController({ entity }: ControllerProps) {
  const em = useEntityManager();
  const camera = em.getComponent(Camera, entity);
  const { transform } = useComponents(entity);
  const { running } = useEditorContext();
  const cameraRef = useRef<THREE.PerspectiveCamera>(null!);
  useHelper(!running && cameraRef, THREE.CameraHelper);

  return (
    camera && (
      <>
        {!running && <TransformControlsController entity={entity} />}
        <PerspectiveCamera
          makeDefault={running}
          ref={cameraRef}
          fov={camera.fov}
          near={camera.near}
          far={camera.far}
          position={transform?.position}
          rotation={[transform?.rotation[0], transform?.rotation[1], 0, 'YXZ']}
          scale={transform?.scale}
        />
      </>
    )
  );
}
