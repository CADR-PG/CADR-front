import { TransformControls } from '@react-three/drei';
import * as THREE from 'three';
import { useEditorContext } from '../../hooks/useEditorContext';
import ControllerProps from '../../types/ControllerProps';
import { ECS } from '../../engine/ECS';
import Transform from '../../engine/components/Transform';
import { RefObject } from 'react';

interface RefObjectTen {
  meshRef: RefObject<THREE.Object3D>;
}

export default function TransformControlsController({
  entity,
  children,
  meshRef,
}: ControllerProps & RefObjectTen) {
  const { running, focused, editingMode } = useEditorContext();
  const transform = ECS.instance.entityManager.getComponent(Transform, entity);

  // Fires only when the gizmo is actually dragged (unlike onChange, which
  // also fires for unrelated control property changes), so we persist the
  // resulting transform back into the ECS instead of losing it on the next
  // render.
  const handleObjectChange = () => {
    const mesh = meshRef.current;
    if (transform && mesh) {
      const position = new THREE.Vector3();
      const scale = new THREE.Vector3();
      const quaternion = new THREE.Quaternion();

      mesh.getWorldPosition(position);
      mesh.getWorldScale(scale);
      mesh.getWorldQuaternion(quaternion);

      const euler = new THREE.Euler().setFromQuaternion(quaternion);

      transform.position = [position.x, position.y, position.z];
      transform.rotation = [euler.x, euler.y, euler.z];
      transform.scale = [scale.x, scale.y, scale.z];
    }
  };

  return (
    <TransformControls
      size={!running && entity === focused ? 1 : 0}
      enabled={!running && entity === focused}
      position={transform?.position}
      rotation={transform?.rotation}
      scale={transform?.scale}
      onObjectChange={handleObjectChange}
      mode={editingMode}
    >
      {children}
    </TransformControls>
  );
}
