import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAssetsStore } from './assetsStore';

export default function useAssets() {
  const { uuid } = useParams<{ uuid: string }>();
  const assets = useAssetsStore((s) => s.assets);
  const fetch = useAssetsStore((s) => s.fetch);

  useEffect(() => {
    if (uuid) fetch(uuid);
  }, [uuid, fetch]);

  return { assets, refetch: () => uuid && fetch(uuid) };
}
