import { Component } from '../Component';
import { ECS } from '../ECS';

export default class GLTF implements Component {
  constructor(
    public source: string = '',
    public useDraco: boolean = false,
    public useMeshOpt: boolean = true,
    public animations = null,
  ) {}

  name = 'GLTF';
  element = 'gltf';
}

ECS.instance.entityManager.registerComponent(GLTF);
