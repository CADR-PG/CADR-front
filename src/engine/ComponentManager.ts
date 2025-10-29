import { proxy } from 'valtio';
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

export class ComponentManager {
  // We are creating a map of component's name to its class. I hope that this will be used
  // with scene deserialization. Since we only get JSON back, we need to convert it back to class.
  // Even if the class is really basic, I think.
  registerComponent<T extends Component>(component: ComponentType<T>): void {
    const instance: T = new component();

    this.mapNameToClass[instance.name] = component;
  }

  getAllComponents() {
    return this.components;
  }

  setComponents(components: EntityToComponent) {
    this.components = proxy<EntityToComponent>(components);
  }

  addEntity(entity: Entity) {
    if (!(entity in this.components)) {
      this.components[entity] = {};
    }
  }

  // TODO: This function creates an instance of Component and assigns it to the entity.
  // Components shouldn't be created in any other way. Maybe we should somehow restrict it?
  addComponent(component: Component, entity: Entity): void {
    console.log(this.components[entity]);
    if (component.name in this.components[entity]) {
      return;
    }
    // how THE FUCK does this shit work??????
    // why this { ...component } shit doesn't cause a type error????
    // this works greatly in my favor, but still wtf?
    this.components[entity][component.name] = { ...component };
  }

  // Removing is easy. Just delete the key with the component's name.
  removeComponent<T extends Component>(
    component: ComponentType<T>,
    entity: Entity,
  ): void {
    const instance: T = new component();

    delete this.components[entity][instance.name];
  }

  destroyComponents(entity: Entity) {
    delete this.components[entity];
  }

  getComponents(entity: Entity): { [name: string]: Component } {
    return this.components[entity];
  }

  getComponent<T extends Component>(
    component: ComponentType<T>,
    entity: Entity,
  ): T | null {
    const instance: T = new component();

    console.log(`Does entity ${entity} have ${instance.name}?`);
    if (this.has(component, entity)) {
      console.log(`${entity} has ${instance.name}`);
      return this.components[entity][instance.name] as T;
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
    if (!this.components[entity]) return false;
    console.log(this.components[entity]);

    const instance = new component();

    return instance.name in this.components[entity];
  }

  hasAll(components: Component[], entity: Entity): boolean {
    // TODO: I think this gets too complicated idk
    const c = components.map(
      (component) => this.mapNameToClass[component.name],
    );

    for (const component of c) {
      if (!this.has(component, entity)) {
        return false;
      }
    }

    return true;
  }

  mapNameToClass: NameToClass = {};
  components = proxy<EntityToComponent>({});
}
