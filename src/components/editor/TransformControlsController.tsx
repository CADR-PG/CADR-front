import { TransformControls } from '@react-three/drei';
import ControllerProps from '../../types/ControllerProps';
import { useEditorContext } from '../../hooks/useEditorContext';
import useEntityManager from '../../hooks/useEntityManager';
import Transform from '../../engine/components/Transform';
import { ECS } from '../../engine/ECS';
import { useMesh } from '../../hooks/useMesh';
import * as THREE from 'three';
import { JSX } from 'react';

interface TransformControlsControllerProps {
  children: JSX.Element;
  meshRef: React.RefObject<THREE.Mesh>;
}

export default function TransformControlsController({
  entity,
  children,
  meshRef,
}: ControllerProps & TransformControlsControllerProps) {
  const em = useEntityManager();
  const { running } = useEditorContext();
  const transformRead = em.getComponent(Transform, entity);
  const transform = ECS.instance.entityManager.getComponent(Transform, entity);
  const { editingMode } = useEditorContext();
  const { focused } = useMesh(entity);

  // tbh I'm not a fan of this function. I think it could be simpler idk
  const handleChange = () => {
    const mesh = meshRef.current as THREE.Mesh;
    if (transform) {
      const position = new THREE.Vector3();
      const scale = new THREE.Vector3();
      const rotation = new THREE.Quaternion();

      mesh.getWorldPosition(position);
      mesh.getWorldScale(scale);
      mesh.getWorldQuaternion(rotation);

      const euler = new THREE.Euler().setFromQuaternion(rotation);

      transform.position = [position.x, position.y, position.z];
      transform.rotation = [euler.x, euler.y, euler.z];
      transform.scale = [scale.x, scale.y, scale.z];
    }
  };

  return (
    <TransformControls
      size={!running && entity === focused ? 1 : 0}
      enabled={!running && entity === focused}
      position={transformRead?.position}
      rotation={transformRead?.rotation}
      scale={transformRead?.scale}
      onMouseUp={handleChange}
      mode={editingMode}
    >
      {children}
    </TransformControls>
  );
}
