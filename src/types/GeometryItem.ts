import { GeometryData } from '../engine/components/Geometry';

export default interface GeometryItems {
  [name: string]: new () => GeometryData;
}
