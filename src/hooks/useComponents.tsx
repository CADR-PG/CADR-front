import ComponentNames from '../data/ComponentNames';
import Collider from '../engine/components/Collider';
import Geometry from '../engine/components/Geometry';
import GLTF from '../engine/components/GLTF';
import Invisible from '../engine/components/Invisible';
import Material from '../engine/components/Material';
import Mesh from '../engine/components/Mesh';
import { cPositionalAudio } from '../engine/components/PositionalAudio';
import Transform from '../engine/components/Transform';
import { Entity } from '../engine/Entity';
import useEntityManager from './useEntityManager';
import useEntityRef from './useEntityRef';

export default function useComponents(entity: Entity) {
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
  const gltf = em.getComponent(GLTF, entity);
  const [setRef, object] = useEntityRef(entity);

  const renderComponents = () => {
    return componentKeys.map((component, index) => {
      const element = components[component].element;
      if (
        element &&
        element !== geometry?.element &&
        element !== material?.element &&
        element !== collider?.element &&
        element !== paudio?.element &&
        element !== gltf?.element
      ) {
        const ComponentElement = ComponentNames[element];
        return <ComponentElement key={index} entity={entity} />;
      }
      return null;
    });
  };

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

  const nullFunc = () => null;

  return {
    renderComponents,
    invisible,
    transform,
    mesh,
    gltf,
    setRef,
    object,
    MaterialComponent: MaterialComponent ? MaterialComponent : nullFunc,
    GeometryComponent: GeometryComponent ? GeometryComponent : nullFunc,
    PositionalAudioComponent: PositionalAudioComponent
      ? PositionalAudioComponent
      : nullFunc,
    ColliderComponent: ColliderComponent ? ColliderComponent : nullFunc,
  };
}
