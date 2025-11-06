import { GeometryData } from '../Geometry';
import * as THREE from 'three';

export default class ExtrudeGeometryData implements GeometryData {
  type = 'extrude';
  // TODO: incomplete, because I don't know how to implement the rest for now
  constructor(
    public shape = new THREE.Shape(),
    public curveSegments = 12,
    public steps = 1,
    public depth = 1,
    public bevelEnabled = true,
    public bevelThickness = 0.2,
    public bevelSize = 0.1,
    public bevelOffset = 0,
    public bevelSegments = 3,
  ) {}
}
