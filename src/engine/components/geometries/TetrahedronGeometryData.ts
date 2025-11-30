import { GeometryData } from '../Geometry';

export default class TetrahedronGeometryData implements GeometryData {
  type = 'tetrahedron';
  constructor(
    public radius = 1,
    public detail = 0,
  ) {}
}
