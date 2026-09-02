import { ColliderData } from '../Collider';

export default class Cylinder implements ColliderData {
  type: string = 'cylinderCollider';
  constructor(
    public halfHeight: number = 1,
    public radius: number = 1,
  ) {}
}
