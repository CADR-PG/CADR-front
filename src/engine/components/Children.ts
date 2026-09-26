import { Component } from '../Component';
import { ECS } from '../ECS';
import { Entity } from '../Entity';

export default class Children implements Component {
  constructor(public children: Entity[] = []) {}

  static onEntityDestroyed?: ((entity: Entity) => void) | undefined = (
    entity: Entity,
  ) => {
    const children = ECS.instance.entityManager.getComponent(
      Children,
      entity,
    )?.children;

    if (!children) {
      return;
    }

    for (const child of children) {
      ECS.instance.entityManager.destroyEntity(child);
    }
  };
  name = 'Children';
}

ECS.instance.entityManager.registerComponent(Children);
