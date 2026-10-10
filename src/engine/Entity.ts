import { ECS } from './ECS';
import { setParent } from './Hierarchy';

export type Entity = string;

export function createEntity() {
  const em = ECS.instance.entityManager;
  const entity = crypto.randomUUID();

  if (!(entity in em.getScene().entities)) {
    em.getScene().entities[entity] = {};
  }

  console.log('uhhh');
  if (em.getScene().root) {
    setParent(em.getScene().root, entity);
  } else {
    em.getScene().root = entity;
  }

  return entity;
}
