import ControllerProps from '../../../types/ControllerProps';
import ConeGeometryData from '../../../engine/components/geometries/ConeGeometryData';
import useEntityManager from '../../../hooks/useEntityManager';
import Geometry from '../../../engine/components/Geometry';

export default function ConeController({ entity }: ControllerProps) {
  const em = useEntityManager();
  const geometry = em.getComponent(Geometry, entity);
  const coneGeometry = geometry!.data as ConeGeometryData;

  return (
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
  );
}
