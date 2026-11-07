import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { requestFileDownload } from '../api/client';
import { useGameAssetsStore } from '../stores/gameAssetsStore';
import { isGameRoute } from '../utils/isGameRoute';

export default function useDownloadFile(fileId: string | undefined) {
  const { uuid } = useParams<{ uuid: string }>();
  const gameId = useGameAssetsStore((s) => s.gameId);
  const gameAsset = useGameAssetsStore((s) =>
    fileId ? s.assets[fileId] : undefined,
  );
  const isGame = isGameRoute();
  const sourceId = isGame ? gameId : uuid;

  return useQuery({
    queryKey: ['asset', isGame ? 'game' : 'project', sourceId, fileId],
    queryFn: async () => {
      if (isGame) {
        if (!gameAsset)
          return Promise.reject(new Error(`Asset ${fileId} not found in game`));
        return { data: { downloadUrl: gameAsset } };
      }
      if (!uuid || !fileId)
        return Promise.reject(
          new Error('Project uuid and fileId is required!'),
        );
      return requestFileDownload(uuid, fileId);
    },
    retry: false,
    refetchOnWindowFocus: false,
    enabled: Boolean(fileId && (isGame ? gameAsset : uuid)),
    staleTime: 50 * 60 * 1000,
    gcTime: 55 * 60 * 1000,
    refetchOnMount: false,
  });
}
