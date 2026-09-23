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
    if (!parent) return;
    // TODO: modify children of the parents
    if (ECS.instance.entityManager.has(Children, parent)) {
      console.log('Adding new child');
      ECS.instance.entityManager
        .getComponent(Children, parent)
        ?.children.push(child);
    } else {
      console.log('First new child');
      ECS.instance.entityManager.addComponent(new Children([child]), parent);
    }
    // TODO: modify childs local position
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
  name = 'Parent';
}

ECS.instance.entityManager.registerComponent(Parent);
