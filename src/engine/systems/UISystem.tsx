import useAssets from '@/stores/useAssets';
import { ComponentType, useEffect, useState } from 'react';
import { normalizeUrl } from '../components/helpers/material';
import { sdk } from '@/data/Sdk';
import { requestFileDownload } from '@/api/client';
import { useParams } from 'react-router-dom';
import { ECS } from '../ECS';
import TemplateHolder from '../components/TemplateHolder';

export default function UISystem() {
  const [uis, setUis] = useState<ComponentType[]>([]);
  const { assets } = useAssets();
  const { uuid } = useParams<{ uuid: string }>();

  useEffect(() => {
    if (!uuid) return;

    const controller = new AbortController();
    const { signal } = controller;

    async function load() {
      const loaded: ComponentType[] = [];

      const root = ECS.instance.entityManager.getScene().root;
      if (!root) return;

      const templates = ECS.instance.entityManager.getComponent(
        TemplateHolder,
        root,
      )?.templates;
      if (!templates) return;

      for (const file of templates) {
        try {
          const data = await requestFileDownload(uuid!, file.id);
          if (signal.aborted) return;

          const { default: ui } = await import(
            /* @vite-ignore */ normalizeUrl(data)
          );
          if (signal.aborted) return;

          loaded.push(ui(sdk));
        } catch (e) {
          if (signal.aborted) return;
          console.error(e);
        }
      }

      setUis(loaded);
    }

    load();

    return () => controller.abort();
  }, [uuid, assets]);

  return uis ? uis.map((Ui, i) => <Ui key={i} />) : null;
}
