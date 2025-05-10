import GenericMesh from '../../MeshController';
import ControllerProps from '../../../types/ControllerProps';

function DodecahedronController({ children, ...props }: ControllerProps) {
  return (
    <GenericMesh {...props}>
      <dodecahedronGeometry args={[1, 0]} />
      {children}
    </GenericMesh>
  );
}

export default DodecahedronController;
