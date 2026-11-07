import { ECS } from './ECS';
import { setParent } from './Hierarchy';

export type Entity = string;

export function createEntity(idx?: number) {
  const em = ECS.instance.entityManager;
  const entity = crypto.randomUUID();
  const scene = idx !== undefined ? em.getSceneAt(idx) : em.getScene();

  if (!(entity in scene.entities)) {
    scene.entities[entity] = {};
  }

  if (scene.root) {
    setParent(scene.root, entity);
  } else {
    scene.root = entity;
  }

  return entity;
}
