import GenericMesh from '../../MeshController';
import * as THREE from 'three';
import ControllerProps from '../../../types/ControllerProps';

function ExtrudeController({ children, parentCallback }: ControllerProps) {
  const shape = new THREE.Shape();
  shape.moveTo(0, 0);
  shape.lineTo(1, 0);
  shape.lineTo(1, 1);
  shape.lineTo(0, 1);
  shape.lineTo(0, 0);

  const extrudeSettings = {
    steps: 2,
    depth: 1,
    bevelEnabled: true,
    bevelThickness: 0.2,
    bevelSize: 0.2,
    bevelSegments: 1,
  };

  return (
    <GenericMesh parentCallback={parentCallback}>
      <extrudeGeometry args={[shape, extrudeSettings]} />
      {children}
    </GenericMesh>
  );
}

export default ExtrudeController;
