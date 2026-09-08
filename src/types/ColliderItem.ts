import { ColliderData } from '../engine/components/Collider';

export default interface ColliderItem {
  [name: string]: new () => ColliderData;
}
