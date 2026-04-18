import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProjectAssets, AssetsDirectory } from '../api/client';

export default function useAssets() {
  const { uuid } = useParams<{ uuid: string }>();
  const [assets, setAssets] = useState<AssetsDirectory | null>(null);

  const fetchAssets = useCallback(() => {
    if (!uuid) return;
    getProjectAssets(uuid)
      .then(({ data }) => setAssets(data.assets))
      .catch((err) => console.error('Blad pobierania assetow:', err));
  }, [uuid]);

  useEffect(() => {
    fetchAssets();
  }, [fetchAssets]);

  return { assets, refetch: fetchAssets };
}
