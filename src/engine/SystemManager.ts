import { System, SystemJSX } from '../types/System';

export class SystemManager {
  registerSystem<T extends System>(system: T) {
    this.systems.push(system);
  }

  registerSystemJSX<T extends SystemJSX>(system: T) {
    this.systemsJsx.push(system);
  }

  systems: System[] = [];
  systemsJsx: SystemJSX[] = [];
}
