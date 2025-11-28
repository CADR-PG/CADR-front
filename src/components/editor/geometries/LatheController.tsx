import * as THREE from 'three';
import ControllerProps from '../../../types/ControllerProps';
import useEntityManager from '../../../hooks/useEntityManager';
import Geometry from '../../../engine/components/Geometry';
import LatheGeometryData from '../../../engine/components/geometries/LatheGeometryData';

function LatheController({ entity }: ControllerProps) {
  const em = useEntityManager();
  const geometry = em.getComponent(Geometry, entity);
  let latheGeometry;
  let points;

  if (geometry) {
    latheGeometry = geometry.data as LatheGeometryData;
    points = latheGeometry.points.map((point) => {
      const [x, y] = point;
      return new THREE.Vector2(x, y);
    });
  }

  return (
    latheGeometry && (
      <latheGeometry
        args={[
          points,
          latheGeometry.segments,
          latheGeometry.phiStart,
          latheGeometry.phiLength,
        ]}
      />
    )
  );
}

export default LatheController;
