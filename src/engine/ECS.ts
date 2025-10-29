import { Component, ComponentType } from './Component';
import { Entity } from './Entity';
import { System } from './System';
import { ComponentManager, EntityToComponent } from './ComponentManager';
import BasicMaterial from '../components/editor/materials/BasicMaterial';
import EntityManager from './EntityManager';
import { SystemManager } from './SystemManager';
import { JSX } from 'react';
import BoxController from '../components/editor/geometries/BoxController';

interface ComponentToElement {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [name: string]: (...args: any[]) => JSX.Element | undefined;
}

export const mapComponentToElement: ComponentToElement = {
  basic: BasicMaterial,
  box: BoxController,
};

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
    const entity = this.entityManager.createEntity();
    this.componentManager.addEntity(entity);
    return entity;
  }

  destroyEntity(entity: Entity): void {
    this.componentManager.destroyComponents(entity);
    this.entityManager.destroyEntity(entity);
  }

  getEntities(): Entity[] {
    return this.entityManager.getEntities();
  }

  setEntities(entities: Entity[]) {
    return this.entityManager.setEntities(entities);
  }

  // Components
  getAllComponents() {
    return this.componentManager.getAllComponents();
  }

  setComponents(components: EntityToComponent) {
    return this.componentManager.setComponents(components);
  }

  addComponent(component: Component, entity: Entity): void {
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

  getComponent<T extends Component>(
    component: ComponentType<T>,
    entity: Entity,
  ): T | null {
    return this.componentManager.getComponent(component, entity);
  }

  has<T extends Component>(
    component: ComponentType<T>,
    entity: Entity,
  ): boolean {
    return this.componentManager.has(component, entity);
  }

  hasAll(components: Component[], entity: Entity): boolean {
    return this.componentManager.hasAll(components, entity);
  }

  // Systems
  registerSystem<T extends System>(system: T) {
    this.systemManager.registerSystem(system);
  }

  // API
  update() {
    // TODO: Most likely a performance hit. Another way of doing this
    // is to specify an array of entities for each system beforehand
    // and updating it once entities change their components.
    // Let's take an easy path for now.
    // TODO2: Another way of optimization is to swap the structure from
    // entity -> component, to component -> entity, just like I wanted
    // from the beginning but go biased by tutorials lol.
    for (const system of this.systemManager.systems) {
      // When we find all relevant entities, run the system.
      system.update(this.query(system.components));
    }
  }

  query(components: Component[]) {
    const matchingEntities: Entity[] = [];

    // When an entity satisfies a component condition for particular system,
    // add it to the array of matching entities.
    for (const entity of Object.keys(this.entityManager.getEntities())) {
      if (this.hasAll(components, entity)) {
        matchingEntities.push(entity);
      }
    }
    return matchingEntities;
  }

  clone(entity: Entity) {
    const newEntity = this.createEntity();
    // TODO: not sure about this...
    const components = JSON.parse(JSON.stringify(this.getComponents(entity)));
    this.componentManager.components[newEntity] = components;
    return newEntity;
  }
}
