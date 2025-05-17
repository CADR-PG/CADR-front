import GenericMesh from '../../MeshController';
import ControllerProps from '../../../types/ControllerProps';

function TetrahedronController({ children, ...props }: ControllerProps) {
  return (
    <GenericMesh {...props}>
      <tetrahedronGeometry args={[1, 0]} />
      <meshStandardMaterial color="orange" />
      {children}
    </GenericMesh>
  );
}

export default TetrahedronController;
