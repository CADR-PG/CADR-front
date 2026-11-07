import { useFrame } from '@react-three/fiber';
import { ECS } from '../ECS';
import { useEffect, useState } from 'react';
import useAssets from '@/stores/useAssets';
import { normalizeUrl } from '../components/helpers/material';
import { sdk } from '@/data/Sdk';
import { useParams } from 'react-router-dom';
import { requestFileDownload } from '@/api/client';

export default function ScriptSystem() {
  const { assets } = useAssets();
  const { uuid } = useParams<{ uuid: string }>();
  const [initialized, initialize] = useState(false);
  const [started, start] = useState(false);

  useEffect(() => {
    if (!uuid) return;

    const files = assets?.directories?.find(
      (dir) => dir.name.toLowerCase() === 'systems',
    )?.files;
    if (!files?.length) return;

    const controller = new AbortController();
    const { signal } = controller;

    async function load() {
      ECS.instance.clearSystems();

      for (const file of files!) {
        try {
          const data = await requestFileDownload(uuid!, file.id, { signal });
          if (signal.aborted) return;

          const { default: init } = await import(
            /* @vite-ignore */ normalizeUrl(data)
          );
          if (signal.aborted) return;

          init(sdk);
        } catch (e) {
          if (signal.aborted) return;
          console.error(e);
        }
      }

      initialize(true);
    }

    load();

    return () => controller.abort();
  }, [uuid, assets]);

  useFrame((state, delta) => {
    if (!initialized) return;

    if (!started) {
      ECS.instance.start();
      start(true);
    }

    ECS.instance.update(state, delta);
  });

  return null;
}
