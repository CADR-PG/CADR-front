import { Component } from '../Component';
import { ECS } from '../ECS';
import BoxGeometryData from './geometries/BoxGeometryData';

export abstract class GeometryData {
  abstract type: string;
}

export type Point = [x: number, y: number];

export default class Geometry implements Component {
  constructor(data: GeometryData = new BoxGeometryData()) {
    this.data = { ...data };
    this.element = this.data.type;
  }

  name = 'Geometry';
  data: GeometryData;
  element?: string;
}

ECS.instance.entityManager.registerComponent(Geometry);
