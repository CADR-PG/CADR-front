import ControllerProps from '../../../types/ControllerProps';
import useEntityManager from '../../../hooks/useEntityManager';
import Geometry from '../../../engine/components/Geometry';
import ExtrudeGeometryData from '../../../engine/components/geometries/ExtrudeGeometryData';

function ExtrudeController({ entity }: ControllerProps) {
  const em = useEntityManager();
  const geometry = em.getComponent(Geometry, entity);
  let extrudeGeometry;

  if (geometry) {
    extrudeGeometry = geometry.data as ExtrudeGeometryData;
  }

  return (
    extrudeGeometry && (
      <extrudeGeometry
        args={[
          extrudeGeometry.shape,
          {
            steps: extrudeGeometry?.steps,
            depth: extrudeGeometry?.depth,
            bevelEnabled: extrudeGeometry?.bevelEnabled,
            bevelThickness: extrudeGeometry?.bevelThickness,
            bevelSize: extrudeGeometry?.bevelSize,
            bevelSegments: extrudeGeometry?.bevelSegments,
          },
        ]}
      />
    )
  );
}

export default ExtrudeController;
