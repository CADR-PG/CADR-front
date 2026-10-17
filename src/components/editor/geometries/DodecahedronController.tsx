import ControllerProps from '../../../types/ControllerProps';
import useEntityManager from '../../../hooks/useEntityManager';
import Geometry from '../../../engine/components/Geometry';
import DodecahedronGeometryData from '../../../engine/components/geometries/DodecahedronGeometryData';

export default function DodecahedronController({ entity }: ControllerProps) {
  const em = useEntityManager();
  const geometry = em.getComponent(Geometry, entity);
  const dodecahedronGeometry = geometry!.data as DodecahedronGeometryData;

  return (
    <dodecahedronGeometry
      args={[dodecahedronGeometry.radius, dodecahedronGeometry.detail]}
    />
  );
}
