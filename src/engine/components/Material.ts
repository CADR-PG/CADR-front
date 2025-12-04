import { Component } from '../Component';
import { ECS } from '../ECS';
import BasicMaterialData from './materials/BasicMaterialData';

export abstract class MaterialData {
  abstract type: string;
}

export default class Material implements Component {
  constructor(data: MaterialData = new BasicMaterialData()) {
    this.data = { ...data };
    this.element = this.data.type;
  }

  name = 'Material';
  data: MaterialData;
  element?: string;
}

ECS.instance.entityManager.registerComponent(Material);
