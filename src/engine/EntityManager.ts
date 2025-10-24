import { Entity } from '../types/Entity';

export default class EntityManager {
  createEntity(): Entity {
    const entity = crypto.randomUUID();
    this.entities.push(entity);

    return entity;
  }

  getEntities(): Entity[] {
    return this.entities;
  }

  destroyEntity(entity: Entity): void {
    const index = this.entities.findIndex((e) => e === entity);

    if (index === -1) return;

    // Instead of shifting the whole array, replace the last item
    // with the item we are removing to get slightly better performance
    this.entities[index] = this.entities[this.entities.length - 1];
    this.entities.pop();
  }

  private entities: Entity[] = [];
}
