import Geometry from './Geometry';

export default interface BoxGeometry extends Geometry {
  dimensions: [number, number, number];
}
