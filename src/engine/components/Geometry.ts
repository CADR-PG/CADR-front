import { Component } from '../Component';
import { ECS } from '../ECS';
import BoxGeometryData from './geometries/BoxGeometryData';
import CapsuleGeometryData from './geometries/CapsuleGeometryData';
import CircleGeometryData from './geometries/CircleGeometryData';
import ConeGeometryData from './geometries/ConeGeometryData';
import DodecahedronGeometryData from './geometries/DodecahedronGeometryData';
import ExtrudeGeometryData from './geometries/ExtrudeGeometryData';
import LatheGeometryData from './geometries/LatheGeometryData';
import OctahedronGeometryData from './geometries/OctahedronGeometryData';
import CylinderGeometryData from './geometries/CylinderGeometryData';
import PlaneGeometryData from './geometries/PlaneGeometryData';
import SphereGeometryData from './geometries/SphereGeometryData';
import TetrahedronGeometryData from './geometries/TetrahedronGeometryData';
import TorusGeometryData from './geometries/TorusGeometryData';

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

export type GeometryUnion =
  | BoxGeometryData
  | CapsuleGeometryData
  | CircleGeometryData
  | ConeGeometryData
  | CylinderGeometryData
  | DodecahedronGeometryData
  | ExtrudeGeometryData
  | LatheGeometryData
  | OctahedronGeometryData
  | PlaneGeometryData
  | SphereGeometryData
  | TetrahedronGeometryData
  | TorusGeometryData;
