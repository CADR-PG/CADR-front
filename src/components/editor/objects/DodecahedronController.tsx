import GenericMesh from '../../mesh';
import ControllerProps from '../../../types/ControllerProps';

function DodecahedronController({ children }: ControllerProps) {
  return (
    <GenericMesh>
      <dodecahedronGeometry args={[1, 0]} />
      {children}
    </GenericMesh>
  );
}

export default DodecahedronController;
