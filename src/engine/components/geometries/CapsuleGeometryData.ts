import { GeometryData } from '../Geometry';

export default class CapsuleGeometryData implements GeometryData {
  type: string = 'capsule';
  constructor(
    public radius = 1,
    public height = 1,
    public capSegments = 4,
    public radialSegments = 8,
    public heightSegments = 1,
  ) {}
}
