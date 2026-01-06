import { Component, ComponentType } from './Component';
import { Entity } from './Entity';
import { System } from './System';
import { EntityManager } from './EntityManager';
import { proxy, snapshot } from 'valtio';

// Glue class that contains the whole logic of ECS.
// TODO: Maybe add unit tests for this?
export class ECS {
  entityManager: EntityManager;
  systems: System[] = [];
  static #instance: ECS;

  private constructor() {
    this.entityManager = proxy<EntityManager>(new EntityManager());
  }

  // Let it be a singleton, why the fuck not.
  // Systems probably would want to access components data, so I guess
  // we are either making the whole class a singleton or we pass
  // a reference to the ECS class directly to the systems.
  // Singleton is easier in my opinion, so I'm doing it this way.
  // Also, I don't think we will ever need more than one ECS class,
  // so this further validates the idea of making it a singleton.
  public static get instance(): ECS {
    if (!ECS.#instance) {
      ECS.#instance = new ECS();
    }
    return ECS.#instance;
  }

  // Systems
  registerSystem<T extends System>(system: T) {
    this.systems.push(system);
  }

  // API
  update(delta: number) {
    // TODO: Most likely a performance hit. Another way of doing this
    // is to specify an array of entities for each system beforehand
    // and updating it once entities change their components.
    // Let's take an easy path for now.
    // TODO2: Another way of optimization is to swap the structure from
    // entity -> component, to component -> entity, just like I wanted
    // from the beginning but go biased by tutorials lol.
    for (const system of this.systems) {
      // When we find all relevant entities, run the system.
      system.update(this.query(system.components), delta);
    }
  }

  query(components: ComponentType[]) {
    const matchingEntities: Entity[] = [];

    // When an entity satisfies a component condition for particular system,
    // add it to the array of matching entities.
    for (const entity of this.entityManager.getEntities()) {
      if (this.entityManager.hasAll(components, entity)) {
        matchingEntities.push(entity);
      }
    }
    return matchingEntities;
  }

  clone(entity: Entity) {
    const newEntity = this.entityManager.createEntity();
    const components = structuredClone(
      snapshot(this.entityManager.getComponents(entity)),
    );
    this.entityManager.entities[newEntity] = proxy(components);
    return newEntity;
  }
}
