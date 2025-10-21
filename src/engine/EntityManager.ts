import { Entities, Entity, EUID } from '../types/Entity';

export default class EntityManager {
  createEntity(name: string): EUID {
    const entity: Entity = {
      name: name,
    };
    const euid = crypto.randomUUID();
    this.entities[euid] = entity;

    return euid;
  }

  getEntities(): Entities {
    return this.entities;
  }

  destroyEntity(euid: EUID): void {
    delete this.entities[euid];
  }

  private entities: Entities = {};
}
