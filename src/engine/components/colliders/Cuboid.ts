import { ColliderData } from '../Collider';

export default class Cuboid implements ColliderData {
  type: string = 'cuboidCollider';
  constructor(
    public halfWidth = 1,
    public halfHeight = 1,
    public halfDepth = 1,
  ) {}
}
