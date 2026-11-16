import { Component } from '../Component';
import { ECS } from '../ECS';
import { Vec3 } from './Transform';

export type EnvironmentPreset =
  | 'apartment'
  | 'city'
  | 'dawn'
  | 'forest'
  | 'lobby'
  | 'night'
  | 'park'
  | 'studio'
  | 'sunset'
  | 'warehouse';

export default class cEnvironment implements Component {
  constructor(
    public preset: EnvironmentPreset = 'night',
    public background: boolean | 'only' = true,
    public environmentIntensity: number = 0.3,
    public environmentRotation: Vec3 = [0, 0, 0],
    public backgroundIntensity: number = 1,
    public backgroundBlurriness: number = 0,
    public backgroundRotation: Vec3 = [0, 0, 0],
    public blur: number = 0,
    public ground: boolean = false,
    public resolution: number = 256,
    public frames: number = 1,
    public near: number = 1,
    public far: number = 1000,
  ) {}
  name = 'Environment';
}

ECS.instance.entityManager.registerComponent(cEnvironment);
