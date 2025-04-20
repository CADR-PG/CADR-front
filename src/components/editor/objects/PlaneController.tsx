import GenericMesh from '../../MeshController';
import ControllerProps from '../../../types/ControllerProps';

function PlaneController({ children, ...props }: ControllerProps) {
  return (
    <GenericMesh {...props}>
      <planeGeometry args={[3, 3, 32, 32]} />
      {children}
    </GenericMesh>
  );
}

export default PlaneController;
