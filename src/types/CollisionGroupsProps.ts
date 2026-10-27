import { Component, ComponentType } from '@/engine/Component';
import { Entity } from '@/engine/Entity';

export interface CollisionGroupsComponent {
  collisionGroups: number;
}

export interface CollisionGroupsProps<
  T extends Component & CollisionGroupsComponent,
> {
  entity: Entity;
  component: ComponentType<T>;
}
