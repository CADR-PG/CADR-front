import { Component } from '../Component';

export interface BasicMaterialData {
  color: number;
}

export interface PhongMaterialData {
  emissive: [number, number, number];
}

type MaterialType = 'basic' | 'phong' | 'toon';
type MaterialData = BasicMaterialData | PhongMaterialData;

export default class Material implements Component {
  constructor(type: MaterialType, data: MaterialData) {
    this.element = type;
    this.data = data;
  }

  name = 'Material';
  element: MaterialType;
  data: MaterialData;
}
