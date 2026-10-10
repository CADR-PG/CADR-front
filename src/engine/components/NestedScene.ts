import { Component } from '../Component';
import { ECS } from '../ECS';

export default class NestedScene extends Component {
  constructor(public fileId: string = '') {
    super();
  }
  name = 'NestedScene';
}

ECS.instance.entityManager.registerComponent(NestedScene);
