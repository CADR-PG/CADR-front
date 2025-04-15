import GenericMesh from '../../mesh';
import ControllerProps from '../../../types/ControllerProps';

function ConeController({ children, parentCallback }: ControllerProps) {
  return (
    <GenericMesh parentCallback={parentCallback}>
      <coneGeometry args={[1, 2, 32]} />
      {children}
    </GenericMesh>
  );
}

export default ConeController;
