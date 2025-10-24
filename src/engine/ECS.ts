/* eslint-disable @typescript-eslint/no-unsafe-function-type */
import { Component, ComponentType } from '../types/Component';
import { Entity } from '../types/Entity';
import { System, SystemJSX } from '../types/System';
import { ComponentManager } from './ComponentManager';
import EntityManager from './EntityManager';
import { SystemManager } from './SystemManager';

// Glue class that contains the whole logic of ECS.
// TODO: Maybe add unit tests for this?
export class ECS {
  private entityManager: EntityManager;
  private componentManager: ComponentManager;
  private systemManager: SystemManager;
  static #instance: ECS;

  private constructor() {
    this.entityManager = new EntityManager();
    this.componentManager = new ComponentManager();
    this.systemManager = new SystemManager();
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

  // TODO: Do we want to specify the same functions in two places?
  // ECS class and *Manager classes? Maybe the stuff that managers hold
  // should all be in the same ECS class for simplicity?

  // Entities
  createEntity(): Entity {
    return this.entityManager.createEntity();
  }

  destroyEntity(entity: Entity): void {
    this.componentManager.destroyComponents(entity);
    this.entityManager.destroyEntity(entity);
  }

  // Components
  addComponent<T extends Component>(
    component: ComponentType<T>,
    entity: Entity,
  ): void {
    this.componentManager.addComponent(component, entity);
  }

  removeComponent<T extends Component>(
    component: ComponentType<T>,
    entity: Entity,
  ): void {
    this.componentManager.removeComponent(component, entity);
  }

  getComponents(entity: Entity): { [name: string]: Component } {
    return this.componentManager.getComponents(entity);
  }

  has(component: Function, entity: Entity): boolean {
    return this.componentManager.has(component, entity);
  }

  hasAll(components: Iterable<Function>, entity: Entity): boolean {
    return this.componentManager.hasAll(components, entity);
  }

  // Systems
  registerSystem<T extends System>(system: T) {
    this.systemManager.registerSystem(system);
  }

  registerSystemJSX<T extends SystemJSX>(system: T) {
    this.systemManager.registerSystemJSX(system);
  }

  // Systems API
  update() {
    // TODO: Most likely a performance hit. Another way of doing this
    // is to specify an array of entities for each system beforehand
    // and updating it once entities change their components.
    // Let's take an easy path for now.
    for (const system of this.systemManager.systems) {
      const matchingEntities: Entity[] = [];
      for (const entity of Object.keys(this.entityManager.getEntities())) {
        // When an entity satisfies a component condition for particular system,
        // add it to the array of matching entities.
        if (this.hasAll(system.components, entity)) {
          matchingEntities.push(entity);
        }
      }
      // When we find all relevant entities, run the system.
      system.update(matchingEntities);
    }
  }
}
