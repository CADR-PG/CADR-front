import ControllerProps from '../../../types/ControllerProps';
import useEntityManager from '../../../hooks/useEntityManager';
import Geometry from '../../../engine/components/Geometry';
import OctahedronGeometryData from '../../../engine/components/geometries/OctahedronGeometryData';

export default function OctahedronController({ entity }: ControllerProps) {
  const em = useEntityManager();
  const geometry = em.getComponent(Geometry, entity);
  const octahedronGeometry = geometry!.data as OctahedronGeometryData;

  return (
    <octahedronGeometry
      args={[octahedronGeometry.radius, octahedronGeometry.detail]}
    />
  );
}
