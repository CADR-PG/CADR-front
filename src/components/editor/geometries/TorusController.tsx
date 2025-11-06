import ControllerProps from '../../../types/ControllerProps';
import useEntityManager from '../../../hooks/useEntityManager';
import Geometry from '../../../engine/components/Geometry';
import TorusGeometryData from '../../../engine/components/geometries/TorusGeometryData';

function TorusController({ entity }: ControllerProps) {
  const em = useEntityManager();
  const geometry = em.getComponent(Geometry, entity);
  let torusGeometry;

  if (geometry) {
    torusGeometry = geometry.data as TorusGeometryData;
  }

  return (
    torusGeometry && (
      <torusGeometry
        args={[
          torusGeometry.radius,
          torusGeometry.tube,
          torusGeometry.radialSegments,
          torusGeometry.tubularSegments,
          torusGeometry.arc,
        ]}
      />
    )
  );
}

export default TorusController;
