import useAssets from '@/stores/useAssets';
import { ComponentType, useEffect, useState } from 'react';
import { normalizeUrl } from '../components/helpers/material';
import { sdk } from '@/data/Sdk';
import { requestFileDownload } from '@/api/client';
import { useParams } from 'react-router-dom';

export default function UISystem() {
  const [uis, setUis] = useState<ComponentType[]>([]);
  const { assets } = useAssets();
  const { uuid } = useParams<{ uuid: string }>();

  useEffect(() => {
    if (!uuid) return;

    const files = assets?.directories?.find(
      (dir) => dir.name.toLowerCase() === 'templates',
    )?.files;

    if (!files?.length) return;

    const controller = new AbortController();
    const { signal } = controller;

    async function load() {
      const loaded: ComponentType[] = [];
      for (const file of files!) {
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
