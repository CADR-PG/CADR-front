import { Component } from '../Component';
import { ECS } from '../ECS';
import { Entity } from '../Entity';

export default class Children implements Component {
  constructor(public children: Entity[] = []) {}
  name = 'Children';
}

ECS.instance.entityManager.registerComponent(Children);
