import ControllerProps from '../../../types/ControllerProps';
import CircleGeometryData from '../../../engine/components/geometries/CircleGeometryData';
import useEntityManager from '../../../hooks/useEntityManager';
import Geometry from '../../../engine/components/Geometry';

function CircleController({ entity }: ControllerProps) {
  const em = useEntityManager();
  const geometry = em.getComponent(Geometry, entity);
  let circleGeometry;

  if (geometry) {
    circleGeometry = geometry.data as CircleGeometryData;
  }

  return (
    circleGeometry && (
      <circleGeometry
        args={[
          circleGeometry.radius,
          circleGeometry.segments,
          circleGeometry.thetaStart,
          circleGeometry.thetaLength,
        ]}
      />
    )
  );
}

export default CircleController;
