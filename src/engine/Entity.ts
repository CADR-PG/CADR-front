import { Component } from './Component';
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
