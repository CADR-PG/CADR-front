import { proxy, snapshot } from 'valtio';
import { Component, ComponentType } from './Component';
import { Entity } from './Entity';

interface NameToClass {
  [name: string]: ComponentType;
}

// The structure for keeping components is like this:
// { myEntity1: [Material: data, RigidBody: data], myEntity2: [Geometry: data]}
// It won't be the most performant, but I wanted to keep it simple.
export interface EntityToComponent {
  [euid: Entity]: { [name: string]: Component };
}

export class EntityManager {
  createEntity(): Entity {
    const entity = crypto.randomUUID();

    if (!(entity in this.entities)) {
      this.entities[entity] = {};
    }

    return entity;
  }

  getEntities(): Entity[] {
    return Object.keys(this.entities);
  }

  // We are creating a map of component's name to its class. I hope that this will be used
  // with scene deserialization. Since we only get JSON back, we need to convert it back to class.
  // Even if the class is really basic, I think.
  registerComponent<T extends Component>(component: ComponentType<T>): void {
    const instance: T = new component();

    this.mapNameToClass[instance.name] = component;
  }

  getScene() {
    return this.entities;
  }

  copyScene() {
    const copy = structuredClone(snapshot(this.entities));
    this.entitiesCopy = proxy(copy);
  }

  restoreScene() {
    this.entities = this.entitiesCopy;
    this.entitiesCopy = {};
  }

  setScene(entities: EntityToComponent) {
    this.entities = proxy(entities);
  }

  // TODO: This function creates an instance of Component and assigns it to the entity.
  // Components shouldn't be created in any other way. Maybe we should somehow restrict it?
  // TODO2: maybe proper error handling instead of void?
  addComponent(component: Component, entity: Entity): void {
    if (!(entity in this.entities)) return;

    if (component.name in this.entities[entity]) {
      return;
    }
    // how THE FUCK does this shit work??????
    // why this { ...component } shit doesn't cause a type error????
    // this works greatly in my favor, but still wtf?
    this.entities[entity][component.name] = { ...component };
  }

  // Removing is easy. Just delete the key with the component's name.
  removeComponent<T extends Component>(
    component: ComponentType<T>,
    entity: Entity,
  ): void {
    const instance: T = new component();

    delete this.entities[entity][instance.name];
  }

  destroyEntity(entity: Entity) {
    delete this.entities[entity];
  }

  getComponents(entity: Entity): { [name: string]: Component } {
    if (!(entity in this.entities)) return {};

    return this.entities[entity];
  }

  getComponent<T extends Component>(
    component: ComponentType<T>,
    entity: Entity,
  ): T | null {
    const instance: T = new component();

    if (this.has(component, entity)) {
      return this.entities[entity][instance.name] as T;
    } else {
      return null;
    }
  }

  // TODO: When creating systems, we need to get all the entities with specified components.
  // This function should serve as a helper to easily achieve that. Maybe we should only allow
  // `hasAll` function to avoid redundancy in the API?
  has<T extends Component>(
    component: ComponentType<T>,
    entity: Entity,
  ): boolean {
    if (!this.entities[entity]) return false;

    const instance = new component();

    return instance.name in this.entities[entity];
  }

  hasAll(components: ComponentType[], entity: Entity): boolean {
    for (const component of components) {
      if (!this.has(component, entity)) {
        return false;
      }
    }

    return true;
  }

  mapNameToClass: NameToClass = {};
  entities: EntityToComponent = {};
  entitiesCopy: EntityToComponent = {};
}
