import { Component } from '../Component';
import { ECS } from '../ECS';
import { Entity } from '../Entity';
import Parent from './Parent';

export default class Children implements Component {
  constructor(public children: Entity[] = []) {}

  static onEntityDestroyed?: ((entity: Entity) => void) | undefined = (
    entity: Entity,
  ) => {
    console.log('Calling a destructor');
    // remove child instance from parent
    const parent = ECS.instance.entityManager.getComponent(
      Parent,
      entity,
    )?.entity;
    const parentChildren = parent
      ? ECS.instance.entityManager.getComponent(Children, parent)
      : null;

    if (parentChildren) {
      parentChildren.children = parentChildren.children.filter(
        (c) => c !== entity,
      );
    }

    console.log('Removed parent');
    // remove children
    const children = ECS.instance.entityManager.getComponent(
      Children,
      entity,
    )?.children;

    if (!children) {
      console.log('No children :(');
      return;
    }

    console.log('Iterating');

    for (const child of children) {
      ECS.instance.entityManager.destroyEntity(child);
    }
  };
  name = 'Children';
}

ECS.instance.entityManager.registerComponent(Children);
