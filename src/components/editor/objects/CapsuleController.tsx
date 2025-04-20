import ControllerProps from '../../../types/ControllerProps';
import GenericMesh from '../../MeshController';

function CapsuleController({ children, ...props }: ControllerProps) {
  return (
    <GenericMesh {...props}>
      <capsuleGeometry args={[1, 2, 8, 16]} />
      {children}
    </GenericMesh>
  );
}

export default CapsuleController;
