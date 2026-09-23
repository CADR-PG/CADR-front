import GLTFController from '../../components/GLTFController';
import MeshController from '../../components/MeshController';
import useEntityManager from '../../hooks/useEntityManager';
import GLTF from '../components/GLTF';
import { Entity } from '../Entity';

interface RenderSystemProps {
  entity: Entity;
}

export function RenderSystem({ entity }: RenderSystemProps) {
  const em = useEntityManager();

  const pickComponent = (entity: Entity) => {
    const gltf = em.getComponent(GLTF, entity);

    if (gltf) {
      return <GLTFController key={entity} entity={entity} />;
    }
    return <MeshController key={entity} entity={entity} />;
  };

  return <group position={[0, 0, 0]}>{pickComponent(entity)}</group>;
}
