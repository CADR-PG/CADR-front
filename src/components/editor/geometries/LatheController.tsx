import ControllerProps from '../../../types/ControllerProps';
import useEntityManager from '../../../hooks/useEntityManager';
import Geometry from '../../../engine/components/Geometry';
import LatheGeometryData from '../../../engine/components/geometries/LatheGeometryData';

function LatheController({ entity }: ControllerProps) {
  const em = useEntityManager();
  const geometry = em.getComponent(Geometry, entity);
  let latheGeometry;

  if (geometry) {
    latheGeometry = geometry.data as LatheGeometryData;
  }

  return (
    latheGeometry && (
      <latheGeometry
        args={[
          latheGeometry.points,
          latheGeometry.segments,
          latheGeometry.phiStart,
          latheGeometry.phiLength,
        ]}
      />
    )
  );
}

export default LatheController;
