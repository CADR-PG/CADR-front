import { Component } from '../Component';
import { ECS } from '../ECS';
import { Entity } from '../Entity';

export default class Parent implements Component {
  constructor(public entity: Entity | null | undefined) {}
  name = 'Parent';
}

ECS.instance.entityManager.registerComponent(Parent);
