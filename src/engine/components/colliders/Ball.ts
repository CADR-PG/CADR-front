import { ColliderData } from '../Collider';

export default class Ball implements ColliderData {
  type: string = 'ballCollider';
  constructor(public radius: number = 1) {}
}
