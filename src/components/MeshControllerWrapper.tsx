import ControllerProps from '../types/ControllerProps';
import MeshControllerTemplate from './MeshControllerTemplate';
import MeshController from './MeshController';

export default function MeshControllerWrapper({ entity }: ControllerProps) {
  return (
    <MeshControllerTemplate entity={entity}>
      <MeshController entity={entity} />
    </MeshControllerTemplate>
  );
}
