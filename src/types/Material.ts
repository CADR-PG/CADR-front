import { JSX } from 'react';
import BasicMaterial from '../engine/components/BasicMaterial';
import { Component } from './Component';

export interface BasicMaterialData {
  color: [number, number, number];
}

export interface PhongMaterialData {
  emissive: [number, number, number];
}

type MaterialType = 'basic' | 'phong' | 'toon';
type MaterialData = BasicMaterialData | PhongMaterialData;

export default class Material implements Component {
  constructor(type: MaterialType, data: MaterialData) {
    this.type = type;
    this.data = data;
  }

  name = 'Material';
  type: MaterialType;
  data: MaterialData;
}

interface MaterialToComponent {
  [name: string]: (...args: any[]) => JSX.Element;
}

export const mapMaterialToComponent: MaterialToComponent = {
  basic: BasicMaterial,
};
