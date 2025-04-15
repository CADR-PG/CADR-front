import GenericMesh from '../../mesh';
import ControllerProps from '../../../types/ControllerProps';

function OctahedronController({ children, parentCallback }: ControllerProps) {
  return (
    <GenericMesh parentCallback={parentCallback}>
      <octahedronGeometry args={[1, 0]} />
      {children}
    </GenericMesh>
  );
}

export default OctahedronController;
