import {
  RigidBodyAutoCollider,
  RigidBodyTypeString,
} from '@react-three/rapier';
import { Component } from '../Component';
import { ECS } from '../ECS';
import { ActiveCollisionTypes } from './Collider';

export default class RBody implements Component {
  constructor(
    public activeCollisionTypes: ActiveCollisionTypes = ActiveCollisionTypes.ALL,
    public additionalSolverIterations = 0,
    public angularDamping = 0,
    public canSleep = true,
    public ccd = false,
    public colliders: RigidBodyAutoCollider | undefined = false,
    public contactSkin = 0,
    public dominanceGroup = 0,
    public friction = 0,
    public gravityScale = 1.0,
    public includeInvisible = false,
    public mass = 1.0,
    public restitution = 0,
    public sensor = false,
    public softCcdPrediction = 0,
    public type: RigidBodyTypeString = 'dynamic',
  ) {}

  name: string = 'RigidBody';
}

ECS.instance.entityManager.registerComponent(RBody);
