import { Component } from '../Component';
import { ECS } from '../ECS';
import { Vec3 } from './Transform';

export default class ParticleEmitter implements Component {
  constructor(
    public enabled: boolean = true,
    public particlesPerEmission: number = 2,
    public emissionInterval: number = 0.08,
    public lifeMin: number = 1,
    public lifeMax: number = 2,
    public radiusMin: number = 1,
    public radiusMax: number = 2,
    public speed: number = 2,
    public spreadAngle: number = 20,
    public direction: Vec3 = [0, 1, 0],
    public gravity: number = 0,
    public alphaStart: number = 1,
    public alphaEnd: number = 0,
    public scaleStart: number = 0.4,
    public scaleEnd: number = 0.05,
    public colorStart: number = 0xff8c42,
    public colorEnd: number = 0xcc2200,
    public shape: string = 'dot',
  ) {}

  name = 'ParticleEmitter';
  element = 'particleEmitter';
}

ECS.instance.entityManager.registerComponent(ParticleEmitter);
