import ControllerProps from '../types/ControllerProps';
import { useMesh } from '../hooks/useMesh';
import HighlightHelper from './HighlightHelper';
import { ECS } from '../engine/ECS';
import Transform from '../engine/components/Transform';
import { useRef } from 'react';
import { TransformControls } from '@react-three/drei';
import * as THREE from 'three';
import useEntityManager from '../hooks/useEntityManager';
import { useEditorContext } from '../hooks/useEditorContext';
import Invisible from '../engine/components/Invisible';
import ComponentNames from '../data/ComponentNames';

function GenericMesh({ entity, ...props }: ControllerProps) {
  const em = useEntityManager();
  const components = em.getComponents(entity);
  const componentKeys = Object.keys(components);
  const transform = ECS.instance.entityManager.getComponent(Transform, entity);
  const invisible = em.getComponent(Invisible, entity);
  const meshRef = useRef(null!);
  const {
    focused,
    hovered,
    running,
    handleClick,
    handlePointerOver,
    handlePointerOut,
  } = useMesh(entity);
  const { editingMode } = useEditorContext();

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
    !invisible && (
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
          {componentKeys.map((component, index) => {
            const element = components[component].element;
            if (element) {
              const ComponentElement = ComponentNames[element];
              return <ComponentElement key={index} entity={entity} />;
            }
            return null;
          })}
        </mesh>
      </TransformControls>
    )
  );
}

export default GenericMesh;
