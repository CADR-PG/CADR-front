import { useSnapshot } from 'valtio';
import { ECS } from '../ECS';
import GenericMesh from '../../components/MeshController';

export function RenderSystem() {
  const entities = useSnapshot(ECS.instance.getEntities());

  return (
    <group position={[0, 0, 0]}>
      {entities.map((entity) => (
        <GenericMesh key={entity} entity={entity} />
      ))}
    </group>
  );
}
