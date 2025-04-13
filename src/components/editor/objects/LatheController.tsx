import GenericMesh from '../../mesh';
import * as THREE from 'three';
import ControllerProps from '../../../types/ControllerProps';

function LatheController({ children }: ControllerProps) {
  const points = [];
  for (let i = 0; i < 10; i++) {
    points.push(new THREE.Vector2(Math.sin(i * 0.2) * 1.5 + 1, (i - 5) * 0.4));
  }

  return (
    <GenericMesh>
      <latheGeometry args={[points, 32]} />
      {children}
    </GenericMesh>
  );
}

export default LatheController;
