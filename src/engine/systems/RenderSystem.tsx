import GLTFControllerWrapper from '../../components/GLTFControllerWrapper';
import MeshControllerWrapper from '../../components/MeshControllerWrapper';
import useEntityManager from '../../hooks/useEntityManager';
import GLTF from '../components/GLTF';
import { Camera } from '../components/Camera';
import CameraController from '../../components/editor/CameraController';
import { Entity } from '../Entity';

interface RenderSystemProps {
  entity: Entity;
}

export function RenderSystem({ entity }: RenderSystemProps) {
  const em = useEntityManager();

  const pickComponent = (entity: Entity) => {
    if (em.has(Camera, entity)) {
      return <CameraController key={entity} entity={entity} />;
    }

    const gltf = em.getComponent(GLTF, entity);

    if (gltf) {
      return <GLTFControllerWrapper key={entity} entity={entity} />;
    }
    return <MeshControllerWrapper key={entity} entity={entity} />;
  };

  return <group position={[0, 0, 0]}>{pickComponent(entity)}</group>;
}
