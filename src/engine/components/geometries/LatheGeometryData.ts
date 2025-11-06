import { GeometryData } from '../Geometry';

export default class LatheGeometryData implements GeometryData {
  type = 'lathe';
  constructor(
    public points = [],
    public segments = 12,
    public phiStart = 0,
    public phiLength = Math.PI * 2,
  ) {}
}
