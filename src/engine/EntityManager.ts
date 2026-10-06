import { proxy, snapshot } from 'valtio';
import { Component, ComponentType } from './Component';
import { Entity } from './Entity';
import { AnimationAction, Object3D } from 'three';
import { requestFileDownload } from '@/api/client';
import { normalizeUrl, normalizeUrlRaw } from './components/helpers/material';
import { Asset, useEditorSettingsStore } from '@/stores/editorSettingsStore';
import { Vec3 } from './components/Transform';

interface SceneData {
  id: number;
  entities: EntityToComponent;
  entitiesCopy: EntityToComponent;
  dirty: boolean;
  lastCameraPosition?: Vec3;
}

export interface EntityAnimations {
  [entity: Entity]: {
    [animation: string]: AnimationAction | null;
  };
}

interface NameToClass {
  [name: string]: ComponentType;
}

// The structure for keeping components is like this:
// { myEntity1: [Material: data, RigidBody: data], myEntity2: [Geometry: data]}
// It won't be the most performant, but I wanted to keep it simple.
export interface EntityToComponent {
  [euid: Entity]: { [name: string]: Component };
}

interface EntityRefs {
  [entity: Entity]: Object3D | null;
}

export class EntityManager {
  constructor() {
    this.createScene();
  }
  createEntity(): Entity {
    const entity = crypto.randomUUID();

    if (!(entity in this.getScene().entities)) {
      this.getScene().entities[entity] = {};
    }

    return entity;
  }

  getEntities(): Entity[] {
    return Object.keys(this.getScene().entities);
  }

  // We are creating a map of component's name to its class. I hope that this will be used
  // with scene deserialization. Since we only get JSON back, we need to convert it back to class.
  // Even if the class is really basic, I think.
  registerComponent<T extends Component>(component: ComponentType<T>): void {
    const instance: T = new component();

    this.mapNameToClass[instance.name] = component;
  }

  getScene() {
    return this.scenes[this.currentScene];
  }

  createScene() {
    const id = this.sceneId;
    this.scenes.push({
      id,
      entities: {},
      entitiesCopy: {},
      dirty: false,
      lastCameraPosition: [3, 2, 3],
    });

    const newScene: Asset = {
      id: null,
      name: null,
      directory: null,
    };
    useEditorSettingsStore.getState().pushScene(newScene);

    this.sceneId = this.sceneId + 1;

    return id;
  }

  setScene(entities: EntityToComponent, index: number) {
    this.scenes[index].entities = proxy(entities);
    this.scenes[index].id = this.sceneId;
    this.sceneId = this.sceneId + 1;
  }

  // Components imported through scripts should get registered on scene load.
  // If a file is missing, remove the component as it's no longer valid.
  async loadComponents(
    entities: EntityToComponent,
    uuid: string,
    sdk: unknown,
  ) {
    for (const entity of Object.keys(entities)) {
      for (const component of Object.keys(entities[entity])) {
        if ('fileId' in entities[entity][component]) {
          try {
            const { data } = await requestFileDownload(
              uuid,
              entities[entity][component]['fileId'] as string,
            );
            if (!data) continue;
            const { default: init } = await import(
              /* @vite-ignore */ normalizeUrlRaw(data)
            );
            init(sdk);
          } catch (e) {
            console.error('File is no longer valid', e);
            delete entities[entity][component];
          }
        }
      }
    }
  }

  // TODO: This function creates an instance of Component and assigns it to the entity.
  // Components shouldn't be created in any other way. Maybe we should somehow restrict it?
  // TODO2: maybe proper error handling instead of void?
  addComponent(component: Component, entity: Entity): void {
    if (!(entity in this.getScene().entities)) return;

    if (component.name in this.getScene().entities[entity]) {
      return;
    }
    // how THE FUCK does this shit work??????
    // why this { ...component } shit doesn't cause a type error????
    // this works greatly in my favor, but still wtf?
    this.getScene().entities[entity][component.name] = { ...component };
  }

  // Removing is easy. Just delete the key with the component's name.
  removeComponent<T extends Component>(
    component: ComponentType<T>,
    entity: Entity,
  ): void {
    const instance: T = new component();

    delete this.getScene().entities[entity][instance.name];
  }

  destroyEntity(entity: Entity) {
    const components = this.getScene().entities[entity];
    // TODO: return early?
    if (!components) {
      console.log('No components??');
      return;
    }

    for (const name of Object.keys(components)) {
      console.log('Trying to call destrcutor for', name);
      this.mapNameToClass[name]?.onEntityDestroyed?.(entity);
    }

    delete this.getScene().entities[entity];
    delete this.refs[entity];
  }

  getComponents(entity: Entity | null): { [name: string]: Component } {
    if (!entity || !(entity in this.getScene().entities)) return proxy({});

    return this.getScene().entities[entity];
  }

  getComponent<T extends Component>(
    component: ComponentType<T>,
    entity: Entity,
  ): T | null {
    const instance: T = new component();

    if (this.has(component, entity)) {
      return this.getScene().entities[entity][instance.name] as T;
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
    if (!this.getScene().entities[entity]) return false;

    const instance = new component();

    return instance.name in this.getScene().entities[entity];
  }

  // PERF: cache components for all systems
  hasAll(components: (Component | string)[], entity: Entity): boolean {
    for (const component of components) {
      if (typeof component === 'string') {
        if (!this.is(component, entity)) {
          return false;
        }
      } else if (!this.has(this.mapNameToClass[component.name], entity)) {
        return false;
      }
    }

    return true;
  }

  is(component: string, entity: Entity) {
    return component in this.getScene().entities[entity];
  }

  copyScene() {
    const copy = structuredClone(snapshot(this.getScene().entities));
    this.getScene().entitiesCopy = proxy(copy);
  }

  restoreScene() {
    this.getScene().entities = this.getScene().entitiesCopy;
    this.getScene().entitiesCopy = {};
  }

  mapNameToClass: NameToClass = {};
  entities: EntityToComponent = {};
  entitiesCopy: EntityToComponent = {};
  refs: EntityRefs = {};
  animations: EntityAnimations = {};
  scenes: SceneData[] = [];
  currentScene: number = 0;
  sceneId: number = 0;
}
