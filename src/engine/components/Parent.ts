import { Component } from '../Component';
import { ECS } from '../ECS';
import { Entity } from '../Entity';
import Children from './Children';
import Transform, { subVec3 } from './Transform';

export default class Parent implements Component {
  constructor(
    public entity: Entity | null | undefined,
    child: Entity,
  ) {
    const parent = entity;
    if (!parent || parent === child) return;

    // add new child to the parent
    if (ECS.instance.entityManager.has(Children, parent)) {
      console.log('Adding new child');
      ECS.instance.entityManager
        .getComponent(Children, parent)
        ?.children.push(child);
    } else {
      console.log('First new child');
      ECS.instance.entityManager.addComponent(new Children([child]), parent);
    }

    // remove child from original parent
    const ogParent = ECS.instance.entityManager.getComponent(
      Parent,
      child,
    )?.entity;
    const children = ogParent
      ? ECS.instance.entityManager.getComponent(Children, ogParent)
      : null;

    if (children) {
      children.children = children.children.filter((c) => c !== child);
    }
    ECS.instance.entityManager.removeComponent(Parent, child);

    // modify child's local position
    const snap = ECS.instance.entityManager.getComponent(Transform, child);
    const pPos = ECS.instance.entityManager.getComponent(Transform, parent);
    if (!snap || !pPos) return;
    ECS.instance.entityManager.removeComponent(Transform, child);
    snap.position = subVec3(snap.position, pPos.position);
    snap.rotation = subVec3(snap.rotation, pPos.rotation);
    // snap.scale = ...
    ECS.instance.entityManager.addComponent(
      new Transform(snap.position, snap.rotation, snap.scale),
      child,
    );
  }

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

    // remove children
    console.log('Calling a destructor');
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
  name = 'Parent';
}

ECS.instance.entityManager.registerComponent(Parent);
