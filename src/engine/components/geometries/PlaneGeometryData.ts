import { GeometryData } from '../Geometry';

export default class PlaneGeometryData implements GeometryData {
  type = 'plane';
  constructor(
    public width = 1,
    public height = 1,
    public widthSegments = 1,
    public heightSegments = 1,
  ) {}
}
