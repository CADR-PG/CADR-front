import { Component } from '../Component';
import { ECS } from '../ECS';
import PointLightData from './lights/PointLightData';

// TODO(m1k53r): move repeating properties like color or castShadow
// into this abstract class. maybe.
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
