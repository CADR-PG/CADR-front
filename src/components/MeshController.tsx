import ControllerProps from '../types/ControllerProps';
import { useMesh } from '../hooks/useMesh';
import HighlightHelper from './HighlightHelper';
import { useSnapshot } from 'valtio';
import { ECS, mapComponentToElement } from '../engine/ECS';
import Transform from '../engine/components/Transform';
import { useRef } from 'react';
import { TransformControls } from '@react-three/drei';
import * as THREE from 'three';

function GenericMesh({ entity, ...props }: ControllerProps) {
  const components = useSnapshot(ECS.instance.getComponents(entity));
  const componentKeys = Object.keys(components);
  const transform = ECS.instance.getComponent(Transform, entity);
  const meshRef = useRef(null!);
  const {
    focused,
    hovered,
    running,
    handleRef,
    handleClick,
    handlePointerOver,
    handlePointerOut,
  } = useMesh(entity);

  const handleChange = () => {
    const mesh = meshRef.current as THREE.Mesh;
    if (transform) {
      console.log(mesh);
      const position = new THREE.Vector3();
      const rotation = new THREE.Quaternion();
      const scale = new THREE.Vector3();
      mesh.getWorldPosition(position);
      mesh.getWorldQuaternion(rotation); // TODO: might not work xd
      mesh.getWorldScale(scale);
      console.log(mesh.position);
      transform.position = [position.x, position.y, position.z];
      transform.rotation = [rotation.x, rotation.y, rotation.z];
      transform.scale = [scale.x, scale.y, scale.z];
    }
  };

  return (
    <TransformControls
      size={entity === focused ? 1 : 0}
      enabled={!running && entity === focused}
      position={transform?.position}
      rotation={transform?.rotation}
      scale={transform?.scale}
      onChange={handleChange}
    >
      <mesh
        {...props}
        onClick={handleClick}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        ref={meshRef}
      >
        <HighlightHelper
          entity={entity}
          focused={!running ? focused : ''}
          hovered={!running ? hovered : false}
        />
        {componentKeys.map((component) => {
          const element = components[component].element;
          if (element) {
            console.log('rendering ' + element);
            const ComponentElement = mapComponentToElement[element];
            return <ComponentElement entity={entity} />;
          }
        })}
      </mesh>
    </TransformControls>
  );
}

export default GenericMesh;
