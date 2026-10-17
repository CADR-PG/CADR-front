import { ColliderData } from '../Collider';

export default class RoundCone implements ColliderData {
  type: string = 'roundConeCollider';
  constructor(
    public halfHeight: number = 1,
    public radius: number = 1,
    public borderRadius: number = 1,
  ) {}
}
