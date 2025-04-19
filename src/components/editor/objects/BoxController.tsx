import GenericMesh from '../../MeshController';
import ControllerProps from '../../../types/ControllerProps';

function BoxController({ children, parentCallback }: ControllerProps) {
  return (
    <GenericMesh parentCallback={parentCallback}>
      <boxGeometry args={[1, 1, 1]} />
      {children}
    </GenericMesh>
  );
}

export default BoxController;
