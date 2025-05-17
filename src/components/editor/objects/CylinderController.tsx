import GenericMesh from '../../MeshController';
import ControllerProps from '../../../types/ControllerProps';

function CylinderController({ children, ...props }: ControllerProps) {
  return (
    <GenericMesh {...props}>
      <cylinderGeometry args={[1, 1, 2, 32]} />
      <meshStandardMaterial color="orange" />
      {children}
    </GenericMesh>
  );
}

export default CylinderController;
