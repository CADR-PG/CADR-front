import { ColliderData } from '../Collider';

export default class RoundCylinder implements ColliderData {
  type: string = 'roundCylinderCollider';
  constructor(
    public halfHeight: number = 1,
    public radius: number = 1,
    public borderRadius: number = 1,
  ) {}
}
