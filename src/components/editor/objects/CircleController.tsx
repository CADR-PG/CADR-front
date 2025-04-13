import GenericMesh from '../../mesh';
import ControllerProps from '../../../types/ControllerProps';

function CircleController({ children }: ControllerProps) {
  return (
    <GenericMesh>
      <circleGeometry args={[1.5, 32]} />
      {children}
    </GenericMesh>
  );
}

export default CircleController;
