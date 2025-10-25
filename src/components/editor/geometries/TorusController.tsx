import GenericMesh from '../../MeshController';
import ControllerProps from '../../../types/ControllerProps';

function TorusController({ children, ...props }: ControllerProps) {
  return (
    <GenericMesh {...props}>
      <torusGeometry args={[0.4, 0.1, 16, 100]} />
      <meshStandardMaterial color="orange" />
      {children}
    </GenericMesh>
  );
}

export default TorusController;
