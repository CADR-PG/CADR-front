import { Component } from '../Component';
import { ECS } from '../ECS';

export default class MainCamera implements Component {
  name = 'MainCamera';
}

ECS.instance.entityManager.registerComponent(MainCamera);
