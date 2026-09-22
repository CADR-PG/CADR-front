import ControllerProps from '../../../types/ControllerProps';
import useEntityManager from '../../../hooks/useEntityManager';
import Geometry from '../../../engine/components/Geometry';
import SphereGeometryData from '../../../engine/components/geometries/SphereGeometryData';

export default function SphereController({ entity }: ControllerProps) {
  const em = useEntityManager();
  const geometry = em.getComponent(Geometry, entity);
  const sphereGeometry = geometry!.data as SphereGeometryData;

  return (
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
  );
}
