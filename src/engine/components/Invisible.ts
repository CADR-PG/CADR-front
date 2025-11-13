import { Component } from '../Component';
import { ECS } from '../ECS';

export default class Invisible implements Component {
  name = 'Invisible';
}

ECS.instance.entityManager.registerComponent(Invisible);
