import CylinderGeometryData from '../../../engine/components/geometries/CylinderGeometryData';
import Geometry from '../../../engine/components/Geometry';
import useEntityManager from '../../../hooks/useEntityManager';
import ControllerProps from '../../../types/ControllerProps';

export default function CylinderController({ entity }: ControllerProps) {
  const em = useEntityManager();
  const geometry = em.getComponent(Geometry, entity);
  const cylinderGeometry = geometry!.data as CylinderGeometryData;

  return (
    <cylinderGeometry
      args={[
        cylinderGeometry.radiusTop,
        cylinderGeometry.radiusBottom,
        cylinderGeometry.height,
        cylinderGeometry.radialSegments,
        cylinderGeometry.heightSegments,
        cylinderGeometry.openEnded,
        cylinderGeometry.thetaStart,
        cylinderGeometry.thetaLength,
      ]}
    />
  );
}
