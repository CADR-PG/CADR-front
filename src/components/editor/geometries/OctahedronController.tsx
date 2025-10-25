import GenericMesh from '../../MeshController';
import ControllerProps from '../../../types/ControllerProps';

function OctahedronController({ children, ...props }: ControllerProps) {
  return (
    <GenericMesh {...props}>
      <octahedronGeometry args={[1, 0]} />
      <meshStandardMaterial color="orange" />
      {children}
    </GenericMesh>
  );
}

export default OctahedronController;
