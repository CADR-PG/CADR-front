import { requestFileDownload } from '@/api/client';
import { normalizeUrl } from './components/helpers/material';
import { sdk } from '@/data/Sdk';
import { ECS } from './ECS';
import { useEditorSettingsStore } from '@/stores/editorSettingsStore';
import { AssetsFile } from '@/types/Assets';

export async function loadScene(uuid: string, file: AssetsFile) {
  const em = ECS.instance.entityManager;
  const scene = await requestFileDownload(uuid, file.id!);
  const text = await fetch(normalizeUrl(scene));
  const body = await text.json();

  await em.loadComponents(body, uuid!, sdk);
  em.setScene(body, em.currentScene);
  useEditorSettingsStore
    .getState()
    .updateScene(
      { id: file.id, name: file.name, directoryId: file.directoryId },
      em.currentScene,
    );
}
