import GenericMesh from '../../components/MeshController';
import useEntities from '../../hooks/useEntities';

export function RenderSystem() {
  const entities = useEntities();

  return (
    <group position={[0, 0, 0]}>
      {entities.map((entity) => (
        <GenericMesh key={entity} entity={entity} />
      ))}
    </group>
  );
}
