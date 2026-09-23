import { Component } from '../Component';
import { ECS } from '../ECS';
import { Entity } from '../Entity';
import Parent from './Parent';

export type Vec3 = [number, number, number];

export function addVec3(vec1: Vec3 | undefined, vec2: Vec3 | undefined): Vec3 {
  if (vec1 === undefined) return vec2 ?? [0, 0, 0];
  if (vec2 === undefined) return vec1;
  return [vec1[0] + vec2[0], vec1[1] + vec2[1], vec1[2] + vec2[2]] as Vec3;
}

export function subVec3(vec1: Vec3 | undefined, vec2: Vec3 | undefined): Vec3 {
  if (vec1 === undefined) return vec2 ?? [0, 0, 0];
  if (vec2 === undefined) return vec1;
  return [vec1[0] - vec2[0], vec1[1] - vec2[1], vec1[2] - vec2[2]] as Vec3;
}

export function toWorld(
  position: Vec3 | null | undefined,
  entity: Entity,
): Vec3 {
  if (!position) return [0, 0, 0];
  const parent = ECS.instance.entityManager.getComponent(Parent, entity);
  if (!parent || !parent.entity) return position;

  const parentPos = ECS.instance.entityManager.getComponent(
    Transform,
    parent.entity,
  );
  if (!parentPos) return position;

  return toWorld(addVec3(position, parentPos.position), parent.entity);
}

export function toLocal(
  position: Vec3 | null | undefined,
  entity: Entity,
): Vec3 {
  if (!position) return [0, 0, 0];
  const parent = ECS.instance.entityManager.getComponent(Parent, entity);
  if (!parent || !parent.entity) return position;

  const parentPos = ECS.instance.entityManager.getComponent(
    Transform,
    parent.entity,
  );
  if (!parentPos) return position;

  return toLocal(subVec3(position, parentPos.position), parent.entity);
}

export default class Transform implements Component {
  constructor(
    public position: Vec3 = [0, 0, 0],
    public rotation: Vec3 = [0, 0, 0],
    public scale: Vec3 = [1, 1, 1],
  ) {}

  name = 'Transform';
}

ECS.instance.entityManager.registerComponent(Transform);
