import { TransformControls } from '@react-three/drei';
import { useEditorContext } from '../../hooks/useEditorContext';
import ControllerProps from '../../types/ControllerProps';
import { ECS } from '../../engine/ECS';
import Transform from '../../engine/components/Transform';
import * as THREE from 'three';
import { RefObject } from 'react';

interface RefObjectTen {
  meshRef: RefObject<unknown>;
}

export default function TransformControlsController({
  entity,
  meshRef,
  children,
}: ControllerProps & RefObjectTen) {
  const { running, focused, editingMode } = useEditorContext();
  const transform = ECS.instance.entityManager.getComponent(Transform, entity);

  const handleChange = () => {
    // const mesh = meshRef.current as THREE.Mesh;
    // if (transform) {
    //   const position = new THREE.Vector3();
    //   const scale = new THREE.Vector3();
    //   const rotation = new THREE.Quaternion();
    //   mesh.getWorldPosition(position);
    //   mesh.getWorldScale(scale);
    //   mesh.getWorldQuaternion(rotation);
    //   const euler = new THREE.Euler().setFromQuaternion(rotation);
    //   transform.position = [position.x, position.y, position.z];
    //   transform.rotation = [euler.x, euler.y, euler.z];
    //   transform.scale = [scale.x, scale.y, scale.z];
    // }
  };
  return (
    <TransformControls
      size={!running && entity === focused ? 1 : 0}
      enabled={!running && entity === focused}
      // TODO: this is a bad idea. we are using non-reactive write-only property
      // to render transformations, because TrasnsformControls are a bitch
      position={transform?.position}
      rotation={transform?.rotation}
      scale={transform?.scale}
      onChange={handleChange}
      mode={editingMode}
    >
      {children}
    </TransformControls>
  );
}
