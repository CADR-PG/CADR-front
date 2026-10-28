import { Entity } from './Entity';
import { ComponentType } from './Component';
import { RootState } from '@react-three/fiber';
import { Vector2 } from 'three';

// Instantiate every system with the components that it requires.
// Components should never change.
export abstract class System {
  components: (ComponentType | string)[];
  constructor(...components: (ComponentType | string)[]) {
    this.components = components;
  }

  abstract update(
    entities: Entity[],
    state: RootState,
    delta: number,
    pointer: Vector2,
  ): void;
  abstract start(): void;
}
