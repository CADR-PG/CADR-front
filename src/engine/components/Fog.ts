import { Component } from '../Component';
import { ECS } from '../ECS';

export type FogData = {
  color: number;
  near: number;
  far: number;
};

export default class Fog implements Component {
  constructor(
    public data: FogData = {
      color: 0x0a0d12,
      near: 5,
      far: 40,
    },
  ) {}
  name = 'Fog';
}

ECS.instance.entityManager.registerComponent(Fog);
