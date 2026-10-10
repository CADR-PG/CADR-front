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
import { Entity } from './Entity';
import Transform from './components/Transform';

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

  const saveScene = em.currentScene;
  em.currentScene = idx;
  // Load external scenes
  for (const entity of Object.keys(em.getScene().entities)) {
    if (em.has(NestedScene, entity)) {
      const nestedScene = em.getComponent(NestedScene, entity);
      const name = em.getComponent(Name, entity);

      if (!nestedScene || !nestedScene.fileId || !name) return;

      loadExternalScene(
        uuid,
        {
          id: nestedScene.fileId,
          name: name.displayName, // name isn't important here actually
        },
        entity,
      );
    }

    em.currentScene = saveScene;
  }

  useEditorSettingsStore.getState().updateScene(
    {
      id: file.id,
      name: file.name,
      directoryId: file.directoryId,
    },
    index !== undefined ? index : em.currentScene,
  );
}

export async function loadExternalScene(
  uuid: string,
  file: Pick<AssetsFile, 'id' | 'name'>,
  parent?: Entity,
  index?: number,
) {
  const em = ECS.instance.entityManager;
  const scene = await requestFileDownload(uuid, file.id!);
  const text = await fetch(normalizeUrl(scene));
  const body = (await text.json()) as SceneJSON;

  await em.loadComponents(body.entities, uuid!, sdk);

  if (!parent) {
    parent = em.createEntity();
    em.addComponent(new Name(file.name), parent);
    em.addComponent(new NestedScene(file.id), parent);
    em.addComponent(new Transform(), parent);
  }

  for (const entity of Object.keys(body.entities)) {
    em.pushEntity(entity, body.entities[entity], index);

    // Mark entity as External to later remove it during scene serialization
    em.addComponent(External, entity);

    // Set new parent for roots of the scene
    // TODO: require only one root for every scene
    if (
      !em.has(Parent, entity) ||
      em.getComponent(Parent, entity)?.entity === null
    ) {
      setParent(parent, entity);
    }

    // Load nested scenes inside nested scenes
    if (em.has(NestedScene, entity)) {
      const id = em.getComponent(NestedScene, entity)?.fileId;
      const name = em.getComponent(Name, entity)?.displayName;

      if (!id || !name) return;

      console.log('loading nested');
      loadExternalScene(uuid, { id, name }, entity);
    }
  }

  // Adding entities to an already existing scene flips the dirty flag
  em.getScene().dirty = false;
}
