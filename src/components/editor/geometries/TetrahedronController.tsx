import ControllerProps from '../../../types/ControllerProps';
import useEntityManager from '../../../hooks/useEntityManager';
import Geometry from '../../../engine/components/Geometry';
import TetrahedronGeometryData from '../../../engine/components/geometries/TetrahedronGeometryData';

function TetrahedronController({ entity }: ControllerProps) {
  const em = useEntityManager();
  const geometry = em.getComponent(Geometry, entity);
  let tetrahedronGeometry;

  if (geometry) {
    tetrahedronGeometry = geometry.data as TetrahedronGeometryData;
  }

  return (
    tetrahedronGeometry && (
      <tetrahedronGeometry
        args={[tetrahedronGeometry.radius, tetrahedronGeometry.detail]}
      />
    )
  );
}

export default TetrahedronController;
