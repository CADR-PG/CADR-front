import ControllerProps from '../../../types/ControllerProps';
import GenericMesh from '../../mesh';

function CapsuleController({ children }: ControllerProps) {
  return (
    <GenericMesh>
      <capsuleGeometry args={[1, 2, 8, 16]} />
      {children}
    </GenericMesh>
  );
}

export default CapsuleController;
