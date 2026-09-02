import { Component } from '../Component';
import { ECS } from '../ECS';

export type Vec3 = [number, number, number];

export function addVec3(vec1: Vec3 | undefined, vec2: Vec3 | undefined) {
  if (vec1 === undefined) return vec2;
  if (vec2 === undefined) return vec1;
  return [vec1[0] + vec2[0], vec1[1] + vec2[1], vec1[2] + vec2[2]] as Vec3;
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
