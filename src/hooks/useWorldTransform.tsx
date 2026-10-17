import { Entity } from '@/engine/Entity';
import useEntityManager from './useEntityManager';
import Transform from '@/engine/components/Transform';
import { applyMatrix, toMatrix } from '@/engine/Hierarchy';
import { Matrix4 } from 'three';
import Parent from '@/engine/components/Parent';

export default function useWorldTransform(entity: Entity): Transform {
  const em = useEntityManager();

  function calculateWorld(entity: Entity): Matrix4 {
    const t = em.getComponent(Transform, entity);
    const local = t ? toMatrix(t) : new Matrix4();
    const parent = em.getComponent(Parent, entity)?.entity;
    return parent ? calculateWorld(parent).multiply(local) : local;
  }

  const world = calculateWorld(entity);
  const newT = new Transform();
  applyMatrix(newT, world);

  return newT;
}
