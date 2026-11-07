import { Component } from '../Component';
import { ECS } from '../ECS';
import { Entity } from '../Entity';
import Children from './Children';

export default class Parent implements Component {
  constructor(public entity: Entity | null | undefined) {}
  static onEntityDestroyed?: ((entity: Entity) => void) | undefined = (
    entity: Entity,
  ) => {
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
  };

  name = 'Parent';
}

ECS.instance.entityManager.registerComponent(Parent);
