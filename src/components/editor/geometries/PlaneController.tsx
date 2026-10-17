import ControllerProps from '../../../types/ControllerProps';
import useEntityManager from '../../../hooks/useEntityManager';
import Geometry from '../../../engine/components/Geometry';
import PlaneGeometryData from '../../../engine/components/geometries/PlaneGeometryData';

export default function PlaneController({ entity }: ControllerProps) {
  const em = useEntityManager();
  const geometry = em.getComponent(Geometry, entity);
  const planeGeometry = geometry!.data as PlaneGeometryData;

  return (
    <planeGeometry
      args={[
        planeGeometry.width,
        planeGeometry.height,
        planeGeometry.widthSegments,
        planeGeometry.heightSegments,
      ]}
    />
  );
}
