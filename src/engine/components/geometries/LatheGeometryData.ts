import { GeometryData, Point } from '../Geometry';

export default class LatheGeometryData implements GeometryData {
  type = 'lathe';
  public points: Point[] = [];

  constructor(
    public segments = 12,
    public phiStart = 0,
    public phiLength = Math.PI * 2,
  ) {
    for (let i = 0; i < 10; i++) {
      this.points.push([Math.sin(i * 0.2) * 1.5 + 1, (i - 5) * 0.4]);
    }
  }
}
