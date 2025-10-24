import { useSnapshot } from 'valtio';
import { ECS } from '../ECS';
import GenericMesh from '../../components/MeshController';

export function RenderSystem() {
  const entities = useSnapshot(ECS.instance.getEntities());

  return (
    <>
      {entities.map((entity) => (
        <GenericMesh entity={entity} />
      ))}
    </>
  );
}
