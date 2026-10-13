import { requestFileDownload } from '@/api/client';
import { normalizeUrl } from './components/helpers/material';
import { sdk } from '@/data/Sdk';
import { ECS } from './ECS';
import { useEditorSettingsStore } from '@/stores/editorSettingsStore';
import { AssetsFile } from '@/types/Assets';
import SceneJSON from '@/types/SceneJSON';
import { setParent } from './Hierarchy';
import External from './components/External';
import Parent from './components/Parent';
import Name from './components/Name';
import NestedScene from './components/NestedScene';
import { createEntity, Entity } from './Entity';
import Transform from './components/Transform';
import Children from './components/Children';

export async function loadScene(
  uuid: string,
  file: Omit<
    AssetsFile,
    'sizeInBytes' | 'createdAt' | 'lastModifiedAt' | 'directories' | 'files'
  >,
  index?: number,
) {
  const em = ECS.instance.entityManager;
  const idx = index !== undefined ? index : em.currentScene;
  const scene = await requestFileDownload(uuid, file.id!);
  const text = await fetch(normalizeUrl(scene));
  const body = (await text.json()) as SceneJSON;

  await em.loadComponents(body.entities, uuid, sdk);
  em.setScene(body, idx);

  // Load external scenes
  for (const entity of Object.keys(em.scenes[idx].entities)) {
    console.log(`${entity} from scene ${idx}`);
    if (em.has(NestedScene, entity)) {
      console.log('nested scene on scene: ', idx);
      const nestedScene = em.getComponent(NestedScene, entity);
      const name = em.getComponent(Name, entity);

      if (!nestedScene || !nestedScene.fileId || !name) continue;

      try {
        await loadExternalScene(
          uuid,
          {
            id: nestedScene.fileId,
            name: name.displayName, // name isn't important here actually
          },
          entity,
          idx,
        );
      } catch {
        console.error('Loading external scene failed');
      }
    }
  }

  useEditorSettingsStore.getState().updateScene(
    {
      id: file.id,
      name: file.name,
      directoryId: file.directoryId,
    },
    idx,
  );
}

export async function loadExternalScene(
  uuid: string,
  file: Pick<AssetsFile, 'id' | 'name'>,
  parent?: Entity,
  idx?: number,
) {
  // TODO: don't instantiate current scene inside current scene
  const em = ECS.instance.entityManager;
  const scene = await requestFileDownload(uuid, file.id!);
  const text = await fetch(normalizeUrl(scene));
  const body = (await text.json()) as SceneJSON;

  await em.loadComponents(body.entities, uuid!, sdk);

  if (!parent) {
    parent = createEntity(idx);
    em.addComponent(new Name(file.name), parent);
    em.addComponent(new NestedScene(file.id), parent);
    em.addComponent(new Transform(), parent);
  }

  const remap = new Map<Entity, Entity>();

  for (const entity of Object.keys(body.entities)) {
    // Reassign UUIDs to not collide with other scenes.
    // TODO: store all entities in one array and reference only the
    // UUIDs in scene structure.
    const newEntity = em.pushEntity(body.entities[entity], idx);
    if (entity === body.root) {
      body.root = newEntity;
    }

    // Store the pair to replace the entity inside components later
    remap.set(entity, newEntity);

    // Mark entity as External to later remove it during scene serialization
    em.addComponent(new External(), newEntity);

    // Set new parent for roots of the scene
    // TODO: require only one root for every scene
    if (
      !em.has(Parent, newEntity) ||
      em.getComponent(Parent, newEntity)?.entity === null
    ) {
      setParent(parent, newEntity);
    }

    // Load nested scenes inside nested scenes
    if (em.has(NestedScene, newEntity)) {
      const id = em.getComponent(NestedScene, newEntity)?.fileId;
      const name = em.getComponent(Name, newEntity)?.displayName;

      if (!id || !name) continue;

      console.log('loading nested');
      try {
        await loadExternalScene(uuid, { id, name }, newEntity, idx);
      } catch {
        console.error('Error loading nested external scene');
      }
    }
  }

  // Replace references to the old entities inside components
  for (const entity of remap.values()) {
    // Update parent
    const parent = em.getComponent(Parent, entity);
    if (parent && parent.entity) {
      parent.entity = remap.get(parent.entity) ?? parent.entity;
    }

    // Update children and their parent
    let children = em.getComponent(Children, entity);
    if (children) {
      children.children = children.children.map(
        (child) => remap.get(child) ?? child,
      );

      children.children.forEach((child) => {
        const parent = em.getComponent(Parent, child);
        if (parent) {
          parent.entity = entity;
        }
      });
    }
  }

  // Reset the transformation of the root node to match the NestedScene component.
  // NOTE: Changing the position of the root node on the scene will be overwritten.
  // I'm not sure if I want to deal with fixing that.
  if (body.root) {
    em.removeComponent(Transform, body.root);
    em.addComponent(new Transform(), body.root);
  }

  // Adding entities to an already existing scene flips the dirty flag
  const sceneIdx = idx !== undefined ? idx : em.currentScene;
  em.scenes[sceneIdx].dirty = false;
}
