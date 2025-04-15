import GenericMesh from '../../mesh';
import ControllerProps from '../../../types/ControllerProps';

function DodecahedronController({ children, parentCallback }: ControllerProps) {
  return (
    <GenericMesh parentCallback={parentCallback}>
      <dodecahedronGeometry args={[1, 0]} />
      {children}
    </GenericMesh>
  );
}

export default DodecahedronController;
