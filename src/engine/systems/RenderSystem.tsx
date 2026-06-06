import GenericMesh from '../../components/MeshController';
import useEntities from '../../hooks/useEntities';
import useEntityManager from '../../hooks/useEntityManager';

export function RenderSystem() {
  const entities = useEntities();
  const em = useEntityManager();

  return (
    <group position={[0, 0, 0]}>
      {entities.map((entity) => {
        return <GenericMesh key={entity} entity={entity} />;
      })}
    </group>
  );
}
