import { Component } from '../Component';

export interface BoxGeometryData {
  dimensions: [number, number, number];
}

export interface CapsuleGeometryData {
  radius: number;
}

type GeometryType = 'box' | 'capsule';
type GeometryData = BoxGeometryData | CapsuleGeometryData;

export default class Geometry implements Component {
  constructor(type: GeometryType, data: GeometryData) {
    this.element = type;
    this.data = data;
  }

  name = 'Geometry';
  element: GeometryType;
  data: GeometryData;
}
