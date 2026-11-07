import { Component } from '../Component';
import { ECS } from '../ECS';

export class Camera implements Component {
  name = 'camera';

  constructor(
    public fov = 50,
    public near = 0.1,
    public far = 2000,
  ) {}
}

ECS.instance.entityManager.registerComponent(Camera);
