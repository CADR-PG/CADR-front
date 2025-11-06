import ControllerProps from '../../../types/ControllerProps';
import useEntityManager from '../../../hooks/useEntityManager';
import Geometry from '../../../engine/components/Geometry';
import OctahedronGeometryData from '../../../engine/components/geometries/OctahedronGeometryData';

function OctahedronController({ entity }: ControllerProps) {
  const em = useEntityManager();
  const geometry = em.getComponent(Geometry, entity);
  let octahedronGeometry;

  if (geometry) {
    octahedronGeometry = geometry.data as OctahedronGeometryData;
  }

  return (
    octahedronGeometry && (
      <octahedronGeometry
        args={[octahedronGeometry.radius, octahedronGeometry.detail]}
      />
    )
  );
}

export default OctahedronController;
