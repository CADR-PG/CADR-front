import PointLightController from '../../components/editor/lights/PointLightController';
import GenericMesh from '../../components/MeshController';
import useEntities from '../../hooks/useEntities';
import useEntityManager from '../../hooks/useEntityManager';
import Light from '../components/Light';

export function RenderSystem() {
  const entities = useEntities();
  const em = useEntityManager();

  return (
    <group position={[0, 0, 0]}>
      {entities.map((entity) => {
        if (em.has(Light, entity)) {
          return <PointLightController entity={entity} />;
        }
        return <GenericMesh key={entity} entity={entity} />;
      })}
    </group>
  );
}
