import { useFrame } from '@react-three/fiber';
import { ECS } from '../ECS';
import { useEffect } from 'react';
import useAssets from '@/stores/useAssets';
import useDownloadFile from '@/hooks/useDownloadFile';
import { normalizeUrl } from '../components/helpers/material';
import { sdk } from '@/data/Sdk';

export default function ScriptSystem() {
  const { assets } = useAssets();
  const dirs = assets!.directories!.filter((dir) => dir.name === 'systems');
  const { data } = useDownloadFile(dirs[0].files![0].id);
  console.log(assets!.directories![0].files);
  useEffect(() => {
    async function load() {
      ECS.instance.clearSystems();
      if (!data) return;

      try {
        const { default: init } = await import(
          /* @vite-ignore */ normalizeUrl(data)
        );
        init(sdk);
      } catch (e) {
        console.error(e);
      }
    }

    load();
  }, [data]);

  useFrame((state, delta) => {
    ECS.instance.update(state, delta);
  });

  return null;
}
