import * as THREE from 'three';
import ControllerProps from '../../../types/ControllerProps';
import useEntityManager from '../../../hooks/useEntityManager';
import Geometry from '../../../engine/components/Geometry';
import ExtrudeGeometryData from '../../../engine/components/geometries/ExtrudeGeometryData';

function ExtrudeController({ entity }: ControllerProps) {
  const em = useEntityManager();
  const geometry = em.getComponent(Geometry, entity);
  let extrudeGeometry;
  let shape;

  if (geometry) {
    extrudeGeometry = geometry.data as ExtrudeGeometryData;
    const ps = extrudeGeometry.points.map((point) => {
      const [x, y] = point;
      return new THREE.Vector2(x, y);
    });
    shape = new THREE.Shape(ps);
  }

  return (
    extrudeGeometry && (
      <extrudeGeometry
        args={[
          shape,
          {
            steps: extrudeGeometry.steps,
            depth: extrudeGeometry.depth,
            bevelEnabled: extrudeGeometry.bevelEnabled,
            bevelThickness: extrudeGeometry.bevelThickness,
            bevelSize: extrudeGeometry.bevelSize,
            bevelSegments: extrudeGeometry.bevelSegments,
          },
        ]}
      />
    )
  );
}

export default ExtrudeController;
