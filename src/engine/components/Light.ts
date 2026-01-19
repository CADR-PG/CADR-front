import { Component } from '../Component';
import { ECS } from '../ECS';
import DirectionalLightData from './lights/DirectionalLightData';
import PointLightData from './lights/PointLightData';

export abstract class LightData {
  abstract type: string;
}

export default class Light implements Component {
  constructor(data: LightData = new PointLightData()) {
    this.data = { ...data };
    this.element = this.data.type;
  }

  name = 'Light';
  data: LightData;
  element?: string;
}

ECS.instance.entityManager.registerComponent(Light);
