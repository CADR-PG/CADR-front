import { ColliderData } from '../Collider';

export default class RoundCuboid implements ColliderData {
  type: string = 'roundCuboidCollider';
  constructor(
    public halfWidth: number = 1,
    public halfHeight: number = 1,
    public halfDepth: number = 1,
    public borderRadius: number = 1,
  ) {}
}
