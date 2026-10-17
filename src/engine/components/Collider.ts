import { CoefficientCombineRule } from '@react-three/rapier';
import { Component } from '../Component';
import { ECS } from '../ECS';
import Cuboid from './colliders/Cuboid';
import { Vec3 } from './Transform';

export enum ActiveCollisionTypes {
  ALL = 60943,
  DEFAULT = 15,
  DYNAMIC_DYNAMIC = 1,
  DYNAMIC_FIXED = 2,
  DYNAMIC_KINEMATIC = 12,
  FIXED_FIXED = 32,
  KINEMATIC_FIXED = 8704,
  KINEMATIC_KINEMATIC = 52224,
}

export abstract class ColliderData {
  abstract type: string;
}

export default class Collider implements Component {
  constructor(
    data: ColliderData = new Cuboid(1, 1, 1),
    public position: Vec3 = [0, 0, 0],
    public rotation: Vec3 = [0, 0, 0],
    public scale: Vec3 = [1, 1, 1],
    public activeCollisionTypes: ActiveCollisionTypes = ActiveCollisionTypes.DEFAULT,
    public collisionGroups: number = 0,
    public contactSkin = 0,
    public friction: number = 1,
    public frictionCombineRule: CoefficientCombineRule = CoefficientCombineRule.Average,
    public mass: number = 1,
    public restitution: number = 0,
    public sensor: boolean = false,
  ) {
    this.data = { ...data };
    this.element = this.data.type;
  }

  name = 'Collider';
  data: ColliderData;
  element?: string;
}

ECS.instance.entityManager.registerComponent(Collider);
