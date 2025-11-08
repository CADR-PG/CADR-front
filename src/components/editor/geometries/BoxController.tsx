import ControllerProps from '../../../types/ControllerProps';
import Geometry from '../../../engine/components/Geometry';
import useEntityManager from '../../../hooks/useEntityManager';
import BoxGeometryData from '../../../engine/components/geometries/BoxGeometryData';

export default function BoxController({ entity }: ControllerProps) {
  const em = useEntityManager();
  const geometry = em.getComponent(Geometry, entity);
  let boxGeometry;

  if (geometry) {
    boxGeometry = geometry.data as BoxGeometryData;
  }

  return (
    boxGeometry && (
      <boxGeometry
        args={[
          boxGeometry.width,
          boxGeometry.height,
          boxGeometry.depth,
          boxGeometry.widthSegments,
          boxGeometry.heightSegments,
          boxGeometry.depthSegments,
        ]}
      />
    )
  );
}
