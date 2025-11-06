import { GeometryData } from '../engine/components/Geometry';

export default interface GeometryItem {
  name: string;
  geometry: new () => GeometryData;
}
