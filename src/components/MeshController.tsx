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
import Material from '../engine/components/Material';
import Geometry from '../engine/components/Geometry';

function GenericMesh({ entity, ...props }: ControllerProps) {
  const em = useEntityManager();
  const components = em.getComponents(entity);
  const componentKeys = Object.keys(components);
  const transformRead = em.getComponent(Transform, entity);
  const transform = ECS.instance.entityManager.getComponent(Transform, entity);
  const invisible = em.getComponent(Invisible, entity);
  const material = em.getComponent(Material, entity);
  const geometry = em.getComponent(Geometry, entity);
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

  let MaterialComponent = null;
  let GeometryComponent = null;
  if (material && material.element) {
    MaterialComponent = ComponentNames[material.element];
  }
  if (geometry && geometry.element) {
    GeometryComponent = ComponentNames[geometry.element];
  }

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
      // TODO: this is a bad idea. we are using non-reactive write-only property
      // to render transformations, because TrasnsformControls are a bitch
      position={transformRead?.position}
      rotation={transformRead?.rotation}
      scale={transformRead?.scale}
      onMouseUp={handleChange}
      mode={editingMode}
    >
      <group>
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
          {MaterialComponent && <MaterialComponent entity={entity} />}
          {GeometryComponent && <GeometryComponent entity={entity} />}
        </mesh>
        {!invisible &&
          componentKeys.map((component, index) => {
            const element = components[component].element;
            console.log(element);
            if (
              element &&
              element !== geometry?.element &&
              element !== material?.element
            ) {
              const ComponentElement = ComponentNames[element];
              return <ComponentElement key={index} entity={entity} />;
            }
            return null;
          })}
      </group>
    </TransformControls>
  );
}

export default GenericMesh;
