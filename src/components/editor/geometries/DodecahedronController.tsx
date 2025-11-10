import ControllerProps from '../../../types/ControllerProps';
import useEntityManager from '../../../hooks/useEntityManager';
import Geometry from '../../../engine/components/Geometry';
import DodecahedronGeometryData from '../../../engine/components/geometries/DodecahedronGeometryData';

function DodecahedronController({ entity }: ControllerProps) {
  const em = useEntityManager();
  const geometry = em.getComponent(Geometry, entity);
  let dodecahedronGeometry;

  if (geometry) {
    dodecahedronGeometry = geometry.data as DodecahedronGeometryData;
  }

  return (
    dodecahedronGeometry && (
      <dodecahedronGeometry
        args={[dodecahedronGeometry.radius, dodecahedronGeometry.detail]}
      />
    )
  );
}

export default DodecahedronController;
