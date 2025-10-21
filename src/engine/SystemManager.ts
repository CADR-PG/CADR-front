import { System } from '../types/System';

export class SystemManager {
  registerSystem<T extends System>(system: T) {
    this.systems.push(system);
  }

  systems: System[] = [];
}
