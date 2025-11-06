import { GeometryData } from '../Geometry';

export default class DodecahedronGeometryData implements GeometryData {
  type = 'dodecahedron';
  constructor(
    public radius = 1,
    public detail = 0,
  ) {}
}
