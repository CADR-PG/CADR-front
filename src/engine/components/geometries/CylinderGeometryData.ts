import { GeometryData } from '../Geometry';

export default class CylinderGeometryData implements GeometryData {
  type = 'cylinder';
  constructor(
    public radiusTop = 1,
    public radiusBottom = 1,
    public height = 1,
    public radialSegments = 32,
    public heightSegments = 1,
    public openEnded = false,
    public thetaStart = 0,
    public thetaLength = Math.PI * 2,
  ) {}
}
