import { requestFileDownload } from '@/api/client';
import { normalizeUrl } from './components/helpers/material';
import { sdk } from '@/data/Sdk';
import { ECS } from './ECS';
import { useEditorSettingsStore } from '@/stores/editorSettingsStore';
import { AssetsFile } from '@/types/Assets';
import SceneJSON from '@/types/SceneJSON';

export async function loadScene(
  uuid: string,
  file: Omit<
    AssetsFile,
    'sizeInBytes' | 'createdAt' | 'lastModifiedAt' | 'directories' | 'files'
  >,
  index?: number,
) {
  const em = ECS.instance.entityManager;
  const scene = await requestFileDownload(uuid, file.id!);
  const text = await fetch(normalizeUrl(scene));
  const body = (await text.json()) as SceneJSON;
  console.log(body);

  await em.loadComponents(body.entities, uuid!, sdk);
  em.setScene(body, index !== undefined ? index : em.currentScene);
  useEditorSettingsStore.getState().updateScene(
    {
      id: file.id,
      name: file.name,
      directoryId: file.directoryId,
    },
    index !== undefined ? index : em.currentScene,
  );
}
