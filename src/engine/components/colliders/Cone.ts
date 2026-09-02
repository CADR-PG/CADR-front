import { ColliderData } from '../Collider';

export default class Cone implements ColliderData {
  type: string = 'coneCollider';
  constructor(
    public halfHeight: number = 1,
    public radius: number = 1,
  ) {}
}
