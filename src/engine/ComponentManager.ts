/* eslint-disable @typescript-eslint/no-unsafe-function-type */
import { Component, ComponentType } from '../types/Component';
import { Entity } from '../types/Entity';

interface NameToClass {
  [name: string]: Component;
}

// The structure for keeping components is like this:
// { myEntity1: [Material: data, RigidBody: data], myEntity2: [Geometry: data]}
// It won't be the most performant, but I wanted to keep it simple.
interface EntityToComponent {
  [euid: Entity]: { [name: string]: Component };
}

export class ComponentManager {
  // We are creating a map of component's name to its class. I hope that this will be used
  // with scene deserialization. Since we only get JSON back, we need to convert it back to class.
  // Even if the class is really basic, I think.
  registerComponent<T extends Component>(component: ComponentType<T>): void {
    this.mapNameToClass[component.name] = component;
  }

  // TODO: This function creates an instance of Component and assigns it to the entity.
  // Components shouldn't be created in any other way. Maybe we should somehow restrict it?
  addComponent<T extends Component>(
    component: ComponentType<T>,
    entity: Entity,
  ): void {
    const instance: T = new component();

    this.components[entity][component.name] = instance;
  }

  // Removing is easy. Just delete the key with the component's name.
  removeComponent<T extends Component>(
    component: ComponentType<T>,
    entity: Entity,
  ): void {
    delete this.components[entity][component.name];
  }

  destroyComponents(entity: Entity) {
    delete this.components[entity];
  }

  getComponents(entity: Entity): { [name: string]: Component } {
    return this.components[entity];
  }

  // TODO: When creating systems, we need to get all the entities with specified components.
  // This function should serve as a helper to easily achieve that. Maybe we should only allow
  // `hasAll` function to avoid redundancy in the API?
  has(component: Function, entity: Entity): boolean {
    return component.name in this.components[entity];
  }

  hasAll(components: Iterable<Function>, entity: Entity): boolean {
    for (const component of components) {
      if (!this.has(component, entity)) {
        return false;
      }
    }

    return true;
  }

  mapNameToClass: NameToClass = {};
  components: EntityToComponent = {};
}
