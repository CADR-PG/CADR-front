import { Component } from '../Component';

type Vec3 = [number, number, number];

export default class Transform extends Component {
  constructor(position: Vec3, rotation: Vec3, scale: Vec3) {
    super(); // TODO: why `super` here?
    this.position = position;
    this.rotation = rotation;
    this.scale = scale;
  }

  name = 'Transform';
  position: Vec3 = [0, 0, 0];
  rotation: Vec3 = [0, 0, 0];
  scale: Vec3 = [0, 0, 0];
}
