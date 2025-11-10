import { GeometryData } from '../Geometry';

export default class CircleGeometryData implements GeometryData {
  type = 'circle';
  constructor(
    public radius = 1,
    public segments = 32,
    public thetaStart = 0,
    public thetaLength = Math.PI * 2,
  ) {}
}
