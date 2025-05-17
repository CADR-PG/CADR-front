import GenericMesh from '../../MeshController';
import ControllerProps from '../../../types/ControllerProps';

function BoxController({ children, ...props }: ControllerProps) {
  return (
    <GenericMesh {...props}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="orange" />
      {children}
    </GenericMesh>
  );
}

export default BoxController;
