import { ColliderData } from '../Collider';

export default class Capsule implements ColliderData {
  type: string = 'capsuleCollider';
  constructor(
    public halfHeight: number = 1,
    public radius: number = 1,
  ) {}
}
