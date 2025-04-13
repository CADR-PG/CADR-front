import GenericMesh from '../../mesh';
import ControllerProps from '../../../types/ControllerProps';
function TorusController({ children }: ControllerProps) {
  return (
    <GenericMesh>
      <torusGeometry args={[0.4, 0.1, 16, 100]} />
      {children}
    </GenericMesh>
  );
}

export default TorusController;
