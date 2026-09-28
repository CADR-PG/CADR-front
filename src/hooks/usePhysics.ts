import Collider, { ColliderData } from '../engine/components/Collider';
import Transform from '../engine/components/Transform';
import { Entity } from '../engine/Entity';
import useEntityManager from './useEntityManager';

export default function usePhysics<T extends ColliderData>(entity: Entity) {
  const em = useEntityManager();
  const c = em.getComponent(Collider, entity);
  const t = em.getComponent(Transform, entity);

  if (!t || !c) return {};

  return {
    params: {
      name: entity,
      position: c.position,
      rotation: c.rotation,
      scale: c.scale,
      activeCollisionTypes: c.activeCollisionTypes,
      collisionGroups: c.collisionGroups,
      contactSkin: c.contactSkin,
      friction: c.friction,
      frictionCombineRule: c.frictionCombineRule,
      mass: c.mass,
      restitution: c.restitution,
      sensor: c.sensor,
    },
    args: c.data as T,
  };
}
