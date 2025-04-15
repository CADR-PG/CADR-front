import GenericMesh from '../../mesh';
import ControllerProps from '../../../types/ControllerProps';

function CylinderController({ children, parentCallback }: ControllerProps) {
  return (
    <GenericMesh parentCallback={parentCallback}>
      <cylinderGeometry args={[1, 1, 2, 32]} />
      {children}
    </GenericMesh>
  );
}

export default CylinderController;
