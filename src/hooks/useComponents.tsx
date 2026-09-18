import ComponentNames from '../data/ComponentNames';
import Collider from '../engine/components/Collider';
import GLTF from '../engine/components/GLTF';
import Invisible from '../engine/components/Invisible';
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
  const collider = em.getComponent(Collider, entity);
  const transform = em.getComponent(Transform, entity);
  const paudio = em.getComponent(cPositionalAudio, entity);
  const mesh = em.getComponent(Mesh, entity);
  const gltf = em.getComponent(GLTF, entity);
  const [setRef, object] = useEntityRef();

  const renderComponents = () => {
    return componentKeys.map((component, index) => {
      const element = components[component].element;
      if (
        element &&
        element !== collider?.element &&
        element !== gltf?.element
      ) {
        const ComponentElement = ComponentNames[element];
        return <ComponentElement key={index} entity={entity} />;
      }
      return null;
    });
  };

  let ColliderComponent = null;
  let PositionalAudioComponent = null;
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
    PositionalAudioComponent: PositionalAudioComponent
      ? PositionalAudioComponent
      : nullFunc,
    ColliderComponent: ColliderComponent ? ColliderComponent : nullFunc,
  };
}
