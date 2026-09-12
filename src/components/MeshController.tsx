import ControllerProps from '../types/ControllerProps';
import { useMesh } from '../hooks/useMesh';
import HighlightHelper from './HighlightHelper';
import { useRef } from 'react';
import useEntityManager from '../hooks/useEntityManager';
import Invisible from '../engine/components/Invisible';
import ComponentNames from '../data/ComponentNames';
import Material from '../engine/components/Material';
import Geometry from '../engine/components/Geometry';
import Mesh from '../engine/components/Mesh';
import TransformControlsController from './editor/TransformControlsController';
import RigidBodyController from './editor/RigidBodyController';
import Collider from '../engine/components/Collider';
import Transform from '../engine/components/Transform';
import { cPositionalAudio } from '../engine/components/PositionalAudio';

function GenericMesh({ entity, ...props }: ControllerProps) {
  const em = useEntityManager();
  const components = em.getComponents(entity);
  const componentKeys = Object.keys(components);
  const invisible = em.getComponent(Invisible, entity);
  const material = em.getComponent(Material, entity);
  const geometry = em.getComponent(Geometry, entity);
  const collider = em.getComponent(Collider, entity);
  const transform = em.getComponent(Transform, entity);
  const paudio = em.getComponent(cPositionalAudio, entity);
  const mesh = em.getComponent(Mesh, entity);
  const meshRef = useRef(null!);
  const {
    focused,
    hovered,
    running,
    handleClick,
    handlePointerOver,
    handlePointerOut,
  } = useMesh(entity);

  let MaterialComponent = null;
  let GeometryComponent = null;
  let ColliderComponent = null;
  let PositionalAudioComponent = null;
  if (material && material.element) {
    MaterialComponent = ComponentNames[material.element];
  }
  if (geometry && geometry.element) {
    GeometryComponent = ComponentNames[geometry.element];
  }
  if (paudio && paudio.element) {
    PositionalAudioComponent = ComponentNames[paudio.element];
  }
  if (collider && collider.element) {
    ColliderComponent = ComponentNames[collider.element];
  }

  return (
    !invisible && (
      <>
        <TransformControlsController entity={entity} meshRef={meshRef}>
          <RigidBodyController entity={entity}>
            <group>
              <mesh
                {...props}
                onClick={handleClick}
                onPointerOver={handlePointerOver}
                onPointerOut={handlePointerOut}
                ref={meshRef}
                castShadow={mesh ? mesh.castShadow : false}
                receiveShadow={mesh ? mesh.receiveShadow : false}
              >
                <HighlightHelper
                  entity={entity}
                  focused={!running ? focused : ''}
                  hovered={!running ? hovered : false}
                />
                {MaterialComponent && <MaterialComponent entity={entity} />}
                {GeometryComponent && <GeometryComponent entity={entity} />}
              </mesh>
              {ColliderComponent && (
                <ColliderComponent
                  entity={entity}
                  key={`${transform?.position} ${transform?.rotation}`}
                />
              )}
              {PositionalAudioComponent && (
              <PositionalAudioComponent
                entity={entity}
                parent={meshRef.current}
              />
            )}
            {componentKeys.map((component, index) => {
                const element = components[component].element;
                console.log(element);
                if (
                  element &&
                  element !== geometry?.element &&
                  element !== material?.element &&
                  element !== collider?.element &&
                  element !== paudio?.element
                ) {
                  const ComponentElement = ComponentNames[element];
                  return <ComponentElement key={index} entity={entity} />;
                }
                return null;
              })}
            </group>
          </RigidBodyController>
        </TransformControlsController>
      </>
    )
  );
}

export default GenericMesh;
