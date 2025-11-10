import { GeometryData } from '../Geometry';

export default class OctahedronGeometryData implements GeometryData {
  type = 'octahedron';
  constructor(
    public radius = 1,
    public detail = 0,
  ) {}
}
