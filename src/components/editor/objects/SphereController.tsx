import GenericMesh from '../../MeshController';
import ControllerProps from '../../../types/ControllerProps';

function SphereController({ children, ...props }: ControllerProps) {
  return (
    <GenericMesh {...props}>
      <sphereGeometry args={[1, 32, 32]} />
      {children}
    </GenericMesh>
  );
}

export default SphereController;
