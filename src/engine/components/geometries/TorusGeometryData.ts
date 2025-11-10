import { GeometryData } from '../Geometry';

export default class TorusGeometryData implements GeometryData {
  type = 'torus';
  constructor(
    public radius = 1,
    public tube = 0.4,
    public radialSegments = 12,
    public tubularSegments = 48,
    public arc = Math.PI * 2,
  ) {}
}
