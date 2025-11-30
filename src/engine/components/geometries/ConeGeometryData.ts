import { GeometryData } from '../Geometry';

export default class ConeGeometryData implements GeometryData {
  type = 'cone';
  constructor(
    public radius = 1,
    public height = 1,
    public radialSegments = 32,
    public heightSegments = 1,
    public openEnded = false,
    public thetaStart = 0,
    public thetaLength = Math.PI * 2,
  ) {}
}
