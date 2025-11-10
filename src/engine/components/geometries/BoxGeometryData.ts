import { GeometryData } from '../Geometry';

export default class BoxGeometryData implements GeometryData {
  type: string = 'box';
  constructor(
    public width = 1,
    public height = 1,
    public depth = 1,
    public widthSegments = 1,
    public heightSegments = 1,
    public depthSegments = 1,
  ) {}
}
