import { RootState } from '@react-three/fiber';
import { ComponentType } from './Component';
import { Entity } from './Entity';

// Instantiate every system with the components that it requires.
// Components should never change.
export abstract class System {
  components: ComponentType[];
  constructor(...components: ComponentType[]) {
    this.components = components;
    this.start();
  }

  abstract update(entities: Entity[], state: RootState, delta: number): void;
  abstract start(): void;
}
