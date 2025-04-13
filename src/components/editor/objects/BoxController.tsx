import GenericMesh from '../../mesh';
import ControllerProps from '../../../types/ControllerProps';

function BoxController({ children }: ControllerProps) {
  return (
    <GenericMesh>
      <boxGeometry args={[1, 1, 1]} />
      {children}
    </GenericMesh>
  );
}

export default BoxController;
