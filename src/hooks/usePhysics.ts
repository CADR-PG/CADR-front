import Collider, { ColliderData } from '../engine/components/Collider';
import Transform, { addVec3 } from '../engine/components/Transform';
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
      position: addVec3(t.position, c.position),
      rotation: addVec3(t.rotation, c.rotation),
      scale: addVec3(t.scale, c.scale),
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
