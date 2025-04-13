import GenericMesh from '../../mesh';
import ControllerProps from '../../../types/ControllerProps';

function PlaneController({ children }: ControllerProps) {
  return (
    <GenericMesh>
      <planeGeometry args={[3, 3, 32, 32]} />
      {children}
    </GenericMesh>
  );
}

export default PlaneController;
