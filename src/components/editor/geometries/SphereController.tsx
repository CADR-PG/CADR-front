import ControllerProps from '../../../types/ControllerProps';
import useEntityManager from '../../../hooks/useEntityManager';
import Geometry from '../../../engine/components/Geometry';
import SphereGeometryData from '../../../engine/components/geometries/SphereGeometryData';

function SphereController({ entity }: ControllerProps) {
  const em = useEntityManager();
  const geometry = em.getComponent(Geometry, entity);
  let sphereGeometry;

  if (geometry) {
    sphereGeometry = geometry.data as SphereGeometryData;
  }

  return (
    sphereGeometry && (
      <sphereGeometry
        args={[
          sphereGeometry.radius,
          sphereGeometry.widthSegments,
          sphereGeometry.heightSegments,
          sphereGeometry.phiStart,
          sphereGeometry.phiLength,
          sphereGeometry.thetaStart,
          sphereGeometry.thetaLength,
        ]}
      />
    )
  );
}

export default SphereController;
