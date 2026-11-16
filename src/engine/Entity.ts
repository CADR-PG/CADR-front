import { Component, ComponentType } from './Component';
import Children from './components/Children';
import Name from './components/Name';
import { ECS } from './ECS';
import { getNestedParent, setParent } from './Hierarchy';

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

export function resurrectEntity(
  entity: Entity,
  components: { [name: string]: Component },
  parent?: Entity | null,
  idx?: number,
): Entity {
  const em = ECS.instance.entityManager;
  const scene = idx !== undefined ? em.getSceneAt(idx) : em.getScene();

  if (!(entity in scene.entities)) {
    // NOTE: Parent could already exist so delete it now to be able to set it again later
    delete components['Parent'];
    scene.entities[entity] = components;
  } else {
    console.error('Entity already exists');
  }

  if (parent) {
    setParent(parent, entity);
  } else if (!scene.root) {
    scene.root = entity;
  }

  return entity;
}

// Pick between destroying only one entity or the whole tree if it's a nested scene.
// Made to be used in scripts.
export function destroyTree(entity: Entity) {
  const parent = getNestedParent(entity);
  if (parent) {
    // ECS.instance.entityManager.destroyEntity(parent);
    ECS.instance.entityManager.toDestroy.push(parent);
  } else {
    // ECS.instance.entityManager.destroyEntity(entity);
    ECS.instance.entityManager.toDestroy.push(entity);
  }
}

export function destroyTreeUnsafe(entity: Entity) {
  const parent = getNestedParent(entity);
  if (parent) {
    // ECS.instance.entityManager.destroyEntity(parent);
    ECS.instance.entityManager.destroyEntity(parent);
  } else {
    // ECS.instance.entityManager.destroyEntity(entity);
    ECS.instance.entityManager.destroyEntity(entity);
  }
}

export function searchTree(
  component: ComponentType | string,
  entity: Entity,
): Entity | null {
  const em = ECS.instance.entityManager;

  if (typeof component === 'string') {
    if (em.is(component, entity)) {
      return entity;
    }
  } else {
    if (em.has(component, entity)) {
      return entity;
    }
  }

  const children = em.getComponent(Children, entity)?.children;

  if (!children) return null;

  for (const child of children) {
    const result = searchTree(component, child);
    if (result) return result;
  }

  return null;
}

export function searchByName(name: string, entity: Entity): Entity | null {
  const em = ECS.instance.entityManager;
  const entityName = em.getComponent(Name, entity)?.displayName;

  if (entityName && entityName === name) return entity;

  const children = em.getComponent(Children, entity)?.children;

  if (!children) return null;

  for (const child of children) {
    const result = searchByName(name, child);
    if (result) return result;
  }

  return null;
}
