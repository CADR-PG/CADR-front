import ControllerProps from '../../../types/ControllerProps';
import { ECS } from '../../../engine/ECS';
import Geometry, { BoxGeometryData } from '../../../engine/components/Geometry';

export default function BoxController({ entity }: ControllerProps) {
  const geometry = ECS.instance.getComponent(Geometry, entity);
  let boxGeometry;

  if (geometry && geometry.element === 'box') {
    boxGeometry = geometry.data as BoxGeometryData;
  }

  return boxGeometry && <boxGeometry args={boxGeometry.dimensions} />;
}
