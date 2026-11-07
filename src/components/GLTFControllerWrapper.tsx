import ControllerProps from '@/types/ControllerProps';
import GLTFController from './GLTFController';
import MeshControllerTemplate from './MeshControllerTemplate';

export default function GLTFControllerWrapper({ entity }: ControllerProps) {
  return (
    <MeshControllerTemplate entity={entity}>
      <GLTFController entity={entity} />
    </MeshControllerTemplate>
  );
}
