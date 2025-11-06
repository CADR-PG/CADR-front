import { Component } from '../Component';

export abstract class GeometryData {
  abstract type: string;
}

export default class Geometry implements Component {
  constructor(data: GeometryData) {
    this.data = { ...data };
    this.element = this.data.type;
  }

  name = 'Geometry';
  data: GeometryData;
  element?: string;
}
