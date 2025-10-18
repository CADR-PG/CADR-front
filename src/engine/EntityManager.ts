import { Entities, Entity, EUID } from "../types/Entity";

export default class EntityManager {
  createEntity(name: string): Entity {
    const entity: Entity = {
      name: name,
    };
    const uuid = crypto.randomUUID();
    this.entities[uuid] = entity;

    return entity;
  }

  getEntities(): Entities {
    return this.entities;
  }

  destroyEntity(euid: EUID): void {
    delete this.entities[euid];
  }

  private entities: Entities = {}
}
