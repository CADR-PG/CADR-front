import { GeometryData } from '../Geometry';

export default class SphereGeometryData implements GeometryData {
  type = 'sphere';
  constructor(
    public radius = 1,
    public widthSegments = 32,
    public heightSegments = 16,
    public phiStart = 0,
    public phiLength = Math.PI * 2,
    public thetaStart = 0,
    public thetaLength = Math.PI,
  ) {}
}
