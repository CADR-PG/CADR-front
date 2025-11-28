import CylinderGeometryData from '../../../engine/components/geometries/CylinderGeometryData';
import Geometry from '../../../engine/components/Geometry';
import useEntityManager from '../../../hooks/useEntityManager';
import ControllerProps from '../../../types/ControllerProps';

function CylinderController({ entity }: ControllerProps) {
  const em = useEntityManager();
  const geometry = em.getComponent(Geometry, entity);
  let cylinderGeometry;

  if (geometry) {
    cylinderGeometry = geometry.data as CylinderGeometryData;
  }

  return (
    cylinderGeometry && (
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
    )
  );
}

export default CylinderController;
