import GenericMesh from '../../MeshController';
import ControllerProps from '../../../types/ControllerProps';

function CircleController({ children, parentCallback }: ControllerProps) {
  return (
    <GenericMesh parentCallback={parentCallback}>
      <circleGeometry args={[1.5, 32]} />
      {children}
    </GenericMesh>
  );
}

export default CircleController;
