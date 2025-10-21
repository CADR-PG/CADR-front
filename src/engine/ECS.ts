import { Component, ComponentType } from '../types/Component';
import { Entities, EUID } from '../types/Entity';
import { SystemType } from '../types/System';
import { ComponentManager } from './ComponentManager';
import EntityManager from './EntityManager';
import { SystemManager } from './SystemManager';

// Glue class that contains the whole logic of ECS.
export class ECS {
  entityManager: EntityManager;
  componentManager: ComponentManager;
  systemManager: SystemManager;

  constructor() {
    this.entityManager = new EntityManager();
    this.componentManager = new ComponentManager();
    this.systemManager = new SystemManager();
  }

  // TODO: Do we want to specify the same functions in two places?
  // ECS class and *Manager classes? Maybe the stuff that managers hold
  // should all be in the same class for simplicity?

  // Entities
  createEntity(name: string): EUID {
    return this.entityManager.createEntity(name);
  }

  destroyEntity(entity: EUID): void {
    this.componentManager.destroyComponents(entity);
    this.entityManager.destroyEntity(entity);
  }

  // Components
  addComponent<T extends Component>(
    component: ComponentType<T>,
    entity: EUID,
  ): void {
    this.componentManager.addComponent(component, entity);
  }

  removeComponent<T extends Component>(
    component: ComponentType<T>,
    entity: EUID,
  ): void {
    this.componentManager.removeComponent(component, entity);
  }

  has<T extends Component>(component: ComponentType<T>, entity: EUID): boolean {
    return this.componentManager.has(component, entity);
  }

  hasAll<T extends Component>(
    components: Iterable<ComponentType<T>>,
    entity: EUID,
  ): boolean {
    return this.componentManager.hasAll(components, entity);
  }

  // Systems
  registerSystem<T extends SystemType>(system: T) {
    this.systemManager.registerSystem(system);
  }

  // Systems API
  update() {
    // TODO: most likely a performance hit
    for (const system of this.systemManager.systems) {
      for (const entity of Object.keys(this.entityManager.getEntities())) {
        if (this.hasAll(system.components, entity)) {
        }
      }
    }
  }
}
