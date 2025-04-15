import GenericMesh from '../../MeshController';
import ControllerProps from '../../../types/ControllerProps';

function SphereController({ children, parentCallback }: ControllerProps) {
  return (
    <GenericMesh parentCallback={parentCallback}>
      <sphereGeometry args={[1, 32, 32]} />
      {children}
    </GenericMesh>
  );
}

export default SphereController;
