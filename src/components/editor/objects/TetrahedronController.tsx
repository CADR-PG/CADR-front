import GenericMesh from '../../mesh';
import ControllerProps from '../../../types/ControllerProps';

function TetrahedronController({ children, parentCallback }: ControllerProps) {
  return (
    <GenericMesh parentCallback={parentCallback}>
      <tetrahedronGeometry args={[1, 0]} />
      {children}
    </GenericMesh>
  );
}

export default TetrahedronController;
