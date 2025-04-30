import GenericMesh from '../../MeshController';
import ControllerProps from '../../../types/ControllerProps';

function ConeController({ children, ...props }: ControllerProps) {
  return (
    <GenericMesh {...props}>
      <coneGeometry args={[1, 2, 32]} />
      {children}
    </GenericMesh>
  );
}

export default ConeController;
