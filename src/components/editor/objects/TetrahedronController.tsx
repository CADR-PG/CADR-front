import GenericMesh from '../../mesh';
import ControllerProps from '../../../types/ControllerProps';

function TetrahedronController({ children }: ControllerProps) {
  return (
    <GenericMesh>
      <tetrahedronGeometry args={[1, 0]} />
      {children}
    </GenericMesh>
  );
}

export default TetrahedronController;
