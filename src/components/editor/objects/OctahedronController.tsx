import GenericMesh from '../../mesh';
import ControllerProps from '../../../types/ControllerProps';

function OctahedronController({ children }: ControllerProps) {
  return (
    <GenericMesh>
      <octahedronGeometry args={[1, 0]} />
      {children}
    </GenericMesh>
  );
}

export default OctahedronController;
