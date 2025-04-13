import GenericMesh from '../../mesh';
import ControllerProps from '../../../types/ControllerProps';

function ConeController({ children }: ControllerProps) {
  return (
    <GenericMesh>
      <coneGeometry args={[1, 2, 32]} />
      {children}
    </GenericMesh>
  );
}

export default ConeController;
