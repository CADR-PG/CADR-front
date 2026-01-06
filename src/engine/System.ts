import { ComponentType } from './Component';
import { Entity } from './Entity';

// Instantiate every system with the components that it requires.
// Components should never change.
export abstract class System {
  components: ComponentType[];
  constructor(...components: ComponentType[]) {
    this.components = components;
  }

  abstract update(entities: Entity[], delta: number): void;
}
