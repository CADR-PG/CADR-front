import GenericMesh from '../../mesh';
import ControllerProps from '../../../types/ControllerProps';

function SphereController({ children }: ControllerProps) {
  return (
    <GenericMesh>
      <sphereGeometry args={[1, 32, 32]} />
      {children}
    </GenericMesh>
  );
}

export default SphereController;
