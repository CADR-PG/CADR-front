import ControllerProps from '../../../types/ControllerProps';
import Geometry, { BoxGeometryData } from '../../../engine/components/Geometry';
import useEntityManager from '../../../hooks/useEntityManager';

export default function BoxController({ entity }: ControllerProps) {
  const em = useEntityManager();
  const geometry = em.getComponent(Geometry, entity);
  let boxGeometry;

  if (geometry && geometry.element === 'box') {
    boxGeometry = geometry.data as BoxGeometryData;
  }

  return boxGeometry && <boxGeometry args={boxGeometry.dimensions} />;
}
