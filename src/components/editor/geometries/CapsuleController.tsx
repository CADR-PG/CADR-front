import CapsuleGeometryData from '../../../engine/components/geometries/CapsuleGeometryData';
import Geometry from '../../../engine/components/Geometry';
import useEntityManager from '../../../hooks/useEntityManager';
import ControllerProps from '../../../types/ControllerProps';

function CapsuleController({ entity }: ControllerProps) {
  const em = useEntityManager();
  const geometry = em.getComponent(Geometry, entity);
  let capsuleGeometry;

  if (geometry) {
    capsuleGeometry = geometry.data as CapsuleGeometryData;
  }

  return (
    capsuleGeometry && (
      <capsuleGeometry
        args={[
          capsuleGeometry.radius,
          capsuleGeometry.height,
          capsuleGeometry.capSegments,
          capsuleGeometry.radialSegments,
          // TODO: ????
          // capsuleGeometry.heightSegments,
        ]}
      />
    )
  );
}

export default CapsuleController;
