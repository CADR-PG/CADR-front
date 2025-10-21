import { ComponentType } from 'react';
import { EUID } from './Entity';

// Instantiate every system with the components that it requires.
// Components should never change.
export abstract class System<T extends ComponentType[] = ComponentType[]> {
  components: T;
  constructor(...components: T) {
    this.components = components;
  }

  abstract update(entities: EUID[]): void;
}
