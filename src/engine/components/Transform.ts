import { Component } from '../Component';
import { ECS } from '../ECS';

export type Vec3 = [number, number, number];

export default class Transform implements Component {
  constructor(
    public position: Vec3 = [0, 0, 0],
    public rotation: Vec3 = [0, 0, 0],
    public scale: Vec3 = [1, 1, 1],
  ) {}

  name = 'Transform';
}

ECS.instance.entityManager.registerComponent(Transform);
