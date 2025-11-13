import { Component } from '../Component';
import { ECS } from '../ECS';

export abstract class MaterialData {
  abstract type: string;
}

export default class Material implements Component {
  constructor(data: MaterialData) {
    this.data = { ...data };
    this.element = this.data.type;
  }

  name = 'Material';
  data: MaterialData;
  element?: string;
}

ECS.instance.entityManager.registerComponent(Material);
