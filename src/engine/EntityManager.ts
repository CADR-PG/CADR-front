import { proxy } from 'valtio';
import { Component, ComponentType } from './Component';
import { Entity } from './Entity';
import { AnimationAction, Object3D } from 'three';
import { requestFileDownload } from '@/api/client';
import { normalizeUrlRaw } from './components/helpers/material';
import { Asset, useEditorSettingsStore } from '@/stores/editorSettingsStore';
import { Vec3 } from './components/Transform';
import SceneJSON from '@/types/SceneJSON';

const INITIAL_CAMERA_POSITION: Vec3 = [3, 2, 3];
export const GAME_SCENE = -1;

interface SceneData {
  id: number;
  entities: EntityToComponent;
  dirty: boolean;
  lastCameraPosition?: Vec3;
  root: Entity | null;
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
// { myEntity1: { Material: data, RigidBody: data }, myEntity2: { Geometry: data }}
// It won't be the most performant, but I wanted to keep it simple.
export interface EntityToComponent {
  [euid: Entity]: { [name: string]: Component };
}

interface EntityRefs {
  [entity: Entity]: Object3D | null;
}

export class EntityManager {
  constructor() {
    console.log('Initializing:', this.initialized, this.scenes.length);
    if (this.scenes.length === 0 && !this.initialized) {
      this.createScene();
    }
    this.initialized = true;
  }

  createEntity(): Entity {
    const entity = crypto.randomUUID();

    if (!(entity in this.getScene().entities)) {
      this.getScene().entities[entity] = {};
    }

    return entity;
  }

  pushEntity(components: { [name: string]: Component }, idx?: number): Entity {
    const scene = idx !== undefined ? this.getSceneAt(idx) : this.getScene();
    const entity = crypto.randomUUID();
    console.log(`pushing ${entity} to ${idx}`, scene.entities);

    if (!(entity in scene.entities)) {
      console.log(`Pushing entity ${entity} for scene ${idx}`);
      scene.entities[entity] = components;
    } else {
      console.error('Entity already exists');
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
    if (this.currentScene === GAME_SCENE) {
      return this.game;
    }
    return this.scenes[this.currentScene];
  }

  createScene() {
    const id = this.sceneId;
    this.scenes.push({
      id,
      entities: {},
      dirty: false,
      lastCameraPosition: INITIAL_CAMERA_POSITION,
      root: null,
    });

    const newScene: Asset = {
      id: null,
      name: null,
      directoryId: null,
    };
    useEditorSettingsStore.getState().pushScene(newScene);

    this.sceneId = this.sceneId + 1;
    this.currentScene = this.scenes.length - 1;

    return id;
  }

  setScene(scene: SceneJSON, idx: number) {
    this.getSceneAt(idx).entities = proxy(scene.entities);
    this.getSceneAt(idx).lastCameraPosition = scene.camera;
    this.getSceneAt(idx).id = this.sceneId;
    this.getSceneAt(idx).dirty = false;
    this.getSceneAt(idx).root = scene.root;
    this.sceneId = this.sceneId + 1;
  }

  getSceneAt(idx: number) {
    if (idx === GAME_SCENE) {
      return this.game;
    }
    return this.scenes[idx];
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
        if (
          component !== 'NestedScene' &&
          'fileId' in entities[entity][component]
        ) {
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
    const scene = this.find(entity);
    if (!scene) return;

    if (component.name in scene.entities[entity]) {
      return;
    }
    // how THE FUCK does this shit work??????
    // why this { ...component } shit doesn't cause a type error????
    // this works greatly in my favor, but still wtf?
    scene.entities[entity][component.name] = { ...component };
  }

  // Removing is easy. Just delete the key with the component's name.
  removeComponent<T extends Component>(
    component: ComponentType<T>,
    entity: Entity,
  ): void {
    const scene = this.find(entity);
    if (!scene) return;

    const instance: T = new component();

    delete scene.entities[entity][instance.name];
  }

  destroyEntity(entity: Entity) {
    const scene = this.find(entity);
    if (!scene) return;

    const components = scene.entities[entity];
    // TODO: return early?
    if (!components) {
      console.log('No components??');
      return;
    }

    for (const name of Object.keys(components)) {
      console.log('Trying to call destrcutor for', name);
      this.mapNameToClass[name]?.onEntityDestroyed?.(entity);
    }

    if (entity === this.getScene().root) {
      scene.root = null;
    }

    delete scene.entities[entity];
    delete this.refs[entity];
  }

  getComponents(entity: Entity | null): { [name: string]: Component } {
    if (!entity) return proxy({});

    const scene = this.find(entity);
    if (!scene) return proxy({});

    return scene.entities[entity];
  }

  getComponent<T extends Component>(
    component: ComponentType<T>,
    entity: Entity,
  ): T | null {
    const instance: T = new component();

    if (this.has(component, entity)) {
      const scene = this.find(entity);
      if (!scene) {
        console.error(
          'Catastrophic failure: component exists, but entity doesnt',
        );
        return null;
      }
      return scene.entities[entity][instance.name] as T;
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
    const scene = this.find(entity);
    if (!scene) return false;

    const instance = new component();

    return instance.name in scene.entities[entity];
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
    const scene = this.find(entity);
    if (!scene) return;

    return component in scene.entities[entity];
  }

  // Find the scene in which the entity exists.
  // First work through current scene, and the interate over all of them.
  // Feature used only for loading nested scene in a scene that is not current.
  find(entity: Entity): SceneData | null {
    // Find in current scene
    let scene = this.getScene();
    if (entity in scene.entities) {
      return scene;
    }

    // Missed, look in all scenes, probably loading external scene
    for (scene of this.scenes) {
      // Skip current scene since it was already checked
      if (scene === this.getScene()) continue;

      if (entity in scene.entities) {
        return scene;
      }
    }

    // Catastrophic fail, entity doesn't exist, should never happen
    console.error(`Entity ${entity} doesn't exist`);
    console.trace();
    return null;
  }

  enterGame() {
    if (this.currentScene === GAME_SCENE) return;
    this.savedScene = this.currentScene;
    this.currentScene = GAME_SCENE;
    this.game.entities = proxy({});
    this.game.root = null;
  }

  exitGame() {
    if (this.currentScene !== GAME_SCENE) return;
    this.currentScene = this.savedScene;
    this.savedScene = GAME_SCENE;
  }

  mapNameToClass: NameToClass = {};
  refs: EntityRefs = {};
  animations: EntityAnimations = {};
  scenes: SceneData[] = [];
  game: SceneData = {
    id: -1,
    entities: {},
    root: null,
    dirty: false,
    lastCameraPosition: [0, 0, 0],
  };
  currentScene: number = 0;
  sceneId: number = 0;
  initialized: boolean = false;
  savedScene: number = GAME_SCENE;
}
