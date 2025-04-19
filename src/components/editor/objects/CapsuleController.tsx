import ControllerProps from '../../../types/ControllerProps';
import GenericMesh from '../../MeshController';

function CapsuleController({ children, parentCallback }: ControllerProps) {
  return (
    <GenericMesh parentCallback={parentCallback}>
      <capsuleGeometry args={[1, 2, 8, 16]} />
      {children}
    </GenericMesh>
  );
}

export default CapsuleController;
