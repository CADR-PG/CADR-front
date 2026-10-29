import { Entity } from './Entity';
import { ComponentType } from './Component';
import UpdateData from '@/types/UpdateData';

// Instantiate every system with the components that it requires.
// Components should never change.
export abstract class System {
  components: (ComponentType | string)[];
  constructor(...components: (ComponentType | string)[]) {
    this.components = components;
  }

  abstract update(entities: Entity[], data: UpdateData): void;
  abstract start(): void;
}
