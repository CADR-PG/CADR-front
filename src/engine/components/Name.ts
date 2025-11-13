import { Component } from '../Component';
import { ECS } from '../ECS';

export default class Name implements Component {
  constructor(public displayName: string = '') {}
  name = 'Name';
}

ECS.instance.entityManager.registerComponent(Name);
