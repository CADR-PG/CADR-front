import { RootState } from '@react-three/fiber';
import { Vector2 } from 'three';

export default interface UpdateData {
  state: RootState;
  delta: number;
  pointer: Vector2;
  // NOTE: lol, lmao even
  world: unknown;
  rapier: unknown;
}
