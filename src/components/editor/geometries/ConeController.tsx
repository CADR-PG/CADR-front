import ControllerProps from '../../../types/ControllerProps';
import ConeGeometryData from '../../../engine/components/geometries/ConeGeometryData';
import useEntityManager from '../../../hooks/useEntityManager';
import Geometry from '../../../engine/components/Geometry';

function ConeController({ entity }: ControllerProps) {
  const em = useEntityManager();
  const geometry = em.getComponent(Geometry, entity);
  let coneGeometry;

  if (geometry) {
    coneGeometry = geometry.data as ConeGeometryData;
  }

  return (
    coneGeometry && (
      <coneGeometry
        args={[
          coneGeometry.radius,
          coneGeometry.height,
          coneGeometry.radialSegments,
          coneGeometry.heightSegments,
          coneGeometry.openEnded,
          coneGeometry.thetaStart,
          coneGeometry.thetaLength,
        ]}
      />
    )
  );
}

export default ConeController;
