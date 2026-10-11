import GLTFController from '../../components/GLTFController';
import MeshController from '../../components/MeshController';
import useEntities from '../../hooks/useEntities';
import useEntityManager from '../../hooks/useEntityManager';
import GLTF from '../components/GLTF';
import { Camera } from '../components/Camera';
import CameraController from '../../components/editor/CameraController';
import { Entity } from '../Entity';

export function RenderSystem() {
  const entities = useEntities();
  const em = useEntityManager();

  const pickComponent = (entity: Entity) => {
    if (em.has(Camera, entity)) {
      return <CameraController key={entity} entity={entity} />;
    }

    const gltf = em.getComponent(GLTF, entity);

    if (gltf) {
      return <GLTFController key={entity} entity={entity} />;
    }
    return <MeshController key={entity} entity={entity} />;
  };

  return <group position={[0, 0, 0]}>{entities.map(pickComponent)}</group>;
}
