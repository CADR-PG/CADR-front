import { Component } from '../Component';
import { ECS } from '../ECS';

export default class Mesh implements Component {
  constructor(
    public castShadow = false,
    public receiveShadow = false,
  ) {}

  name: string = 'Mesh';
}

ECS.instance.entityManager.registerComponent(Mesh);
