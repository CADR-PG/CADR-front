import { Component } from "../Component";
import { ECS } from "../ECS";

export default class RBody implements Component {
  constructor(
    public sensor = false,
  ) {}

  name: string = 'RigidBody';
}

ECS.instance.entityManager.registerComponent(RBody);
