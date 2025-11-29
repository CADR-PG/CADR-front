import ControllerProps from '../../../types/ControllerProps';
import useEntityManager from '../../../hooks/useEntityManager';
import Geometry from '../../../engine/components/Geometry';
import PlaneGeometryData from '../../../engine/components/geometries/PlaneGeometryData';

function PlaneController({ entity }: ControllerProps) {
  const em = useEntityManager();
  const geometry = em.getComponent(Geometry, entity);
  let planeGeometry;

  if (geometry) {
    planeGeometry = geometry.data as PlaneGeometryData;
  }

  return (
    planeGeometry && (
      <planeGeometry
        args={[
          planeGeometry.width,
          planeGeometry.height,
          planeGeometry.widthSegments,
          planeGeometry.heightSegments,
        ]}
      />
    )
  );
}

export default PlaneController;
