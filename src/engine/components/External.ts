import { Component } from '../Component';
import { ECS } from '../ECS';

export default class External extends Component {
  name = 'External';
}

ECS.instance.entityManager.registerComponent(External);
