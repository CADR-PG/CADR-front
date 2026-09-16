import Collider, { ColliderData } from '../engine/components/Collider';
import Transform, { addVec3 } from '../engine/components/Transform';
import { Entity } from '../engine/Entity';
import useEntityManager from './useEntityManager';

export default function usePhysics<T extends ColliderData>(entity: Entity) {
  const em = useEntityManager();
  const colliderData = em.getComponent(Collider, entity);
  const t = em.getComponent(Transform, entity);

  if (!t || !colliderData) return {};

  return {
    params: {
      name: entity,
      position: addVec3(t.position, colliderData.position),
      rotation: addVec3(t.rotation, colliderData.rotation),
      scale: addVec3(t.scale, colliderData.scale),
      activeCollisionTypes: colliderData.activeCollisionTypes,
      collisionGroups: colliderData.collisionGroups,
      contactSkin: colliderData.contactSkin,
      friction: colliderData.friction,
      frictionCombineRule: colliderData.frictionCombineRule,
      mass: colliderData.mass,
      restitution: colliderData.restitution,
      sensor: colliderData.sensor,
    },
    args: colliderData.data as T,
  };
}
