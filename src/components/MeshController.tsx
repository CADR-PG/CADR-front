import ControllerProps from '../types/ControllerProps';
import { useMesh } from '../hooks/useMesh';
import HighlightHelper from './HighlightHelper';
import { JSX, useRef } from 'react';
import useEntityManager from '../hooks/useEntityManager';
import Invisible from '../engine/components/Invisible';
import ComponentNames from '../data/ComponentNames';
import Material from '../engine/components/Material';
import Geometry from '../engine/components/Geometry';
import Mesh from '../engine/components/Mesh';
import TransformControlsController from './editor/TransformControlsController';
import RigidBodyController from './editor/RigidBodyController';
import Collider from '../engine/components/Collider';
import ColliderControllerProps from '../types/ColliderControllerProps';

function GenericMesh({ entity, ...props }: ControllerProps) {
  const em = useEntityManager();
  const components = em.getComponents(entity);
  const componentKeys = Object.keys(components);
  const invisible = em.getComponent(Invisible, entity);
  const material = em.getComponent(Material, entity);
  const geometry = em.getComponent(Geometry, entity);
  const collider = em.getComponent(Collider, entity);
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
  if (material && material.element) {
    MaterialComponent = ComponentNames[material.element];
  }
  if (geometry && geometry.element) {
    GeometryComponent = ComponentNames[geometry.element];
  }
  if (collider && collider.element) {
    ColliderComponent = ComponentNames[collider.element];
  } else {
    ColliderComponent = ({
      children,
    }: ControllerProps & ColliderControllerProps) => {
      return <>{children}</>;
    };
  }

  return (
    !invisible && (
      <>
        <TransformControlsController entity={entity} meshRef={meshRef}>
          <RigidBodyController entity={entity}>
            <ColliderComponent entity={entity}>
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
                {componentKeys.map((component, index) => {
                  const element = components[component].element;
                  console.log(element);
                  if (
                    element &&
                    element !== geometry?.element &&
                    element !== material?.element &&
                    element !== collider?.element
                  ) {
                    const ComponentElement = ComponentNames[element];
                    return <ComponentElement key={index} entity={entity} />;
                  }
                  return null;
                })}
              </group>
            </ColliderComponent>
          </RigidBodyController>
        </TransformControlsController>
      </>
    )
  );
}

export default GenericMesh;
