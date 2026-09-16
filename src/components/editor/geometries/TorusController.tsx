import ControllerProps from '../../../types/ControllerProps';
import useEntityManager from '../../../hooks/useEntityManager';
import Geometry from '../../../engine/components/Geometry';
import TorusGeometryData from '../../../engine/components/geometries/TorusGeometryData';

export default function TorusController({ entity }: ControllerProps) {
  const em = useEntityManager();
  const geometry = em.getComponent(Geometry, entity);
  const torusGeometry = geometry!.data as TorusGeometryData;

  return (
    <torusGeometry
      args={[
        torusGeometry.radius,
        torusGeometry.tube,
        torusGeometry.radialSegments,
        torusGeometry.tubularSegments,
        torusGeometry.arc,
      ]}
    />
  );
}
