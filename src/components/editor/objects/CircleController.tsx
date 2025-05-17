import GenericMesh from '../../MeshController';
import ControllerProps from '../../../types/ControllerProps';

function CircleController({ children, ...props }: ControllerProps) {
  return (
    <GenericMesh {...props}>
      <circleGeometry args={[1.5, 32]} />
      <meshStandardMaterial color="orange" />
      {children}
    </GenericMesh>
  );
}

export default CircleController;
