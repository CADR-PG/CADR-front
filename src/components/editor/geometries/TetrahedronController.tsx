import ControllerProps from '../../../types/ControllerProps';
import useEntityManager from '../../../hooks/useEntityManager';
import Geometry from '../../../engine/components/Geometry';
import TetrahedronGeometryData from '../../../engine/components/geometries/TetrahedronGeometryData';

export default function TetrahedronController({ entity }: ControllerProps) {
  const em = useEntityManager();
  const geometry = em.getComponent(Geometry, entity);
  const tetrahedronGeometry = geometry!.data as TetrahedronGeometryData;

  return (
    <tetrahedronGeometry
      args={[tetrahedronGeometry.radius, tetrahedronGeometry.detail]}
    />
  );
}
