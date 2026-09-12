import GLTFController from '../../components/GLTFController';
import GenericMesh from '../../components/MeshController';
import useEntities from '../../hooks/useEntities';
import useEntityManager from '../../hooks/useEntityManager';
import GLTF from '../components/GLTF';
import { Entity } from '../Entity';

export function RenderSystem() {
  const entities = useEntities();
  const em = useEntityManager();

  const pickComponent = (entity: Entity) => {
    const gltf = em.getComponent(GLTF, entity);

    if (gltf) {
      return <GLTFController key={entity} entity={entity} />;
    }
    return <GenericMesh key={entity} entity={entity} />;
  };

  return <group position={[0, 0, 0]}>{entities.map(pickComponent)}</group>;
}
