import GenericMesh from '../../MeshController';
import ControllerProps from '../../../types/ControllerProps';

function TetrahedronController({ children, ...props }: ControllerProps) {
  return (
    <GenericMesh {...props}>
      <tetrahedronGeometry args={[1, 0]} />
      {children}
    </GenericMesh>
  );
}

export default TetrahedronController;
