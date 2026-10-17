import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createSnapshot } from '../api/client';
import { useSnackbarStore } from '../stores/snackbarStore';
import { getErrorMessage } from '../utils/getErrorMessage';
import { getPublishedGame, setPublishedGame } from '../utils/publishedGames';
import { CreateSnapshotData } from '../types/Shop';

function useCreateSnapshot() {
  const queryClient = useQueryClient();
  const { openSnackbar } = useSnackbarStore();

  return useMutation({
    mutationFn: ({
      projectId,
      data,
    }: {
      projectId: string;
      data: CreateSnapshotData;
    }) => createSnapshot(projectId, data),
    onSuccess: (response, { projectId, data }) => {
      const published = getPublishedGame(projectId);
      setPublishedGame(projectId, {
        gameId: data.gameId,
        title: published?.title ?? '',
        lastVersionId: response.data.id,
        lastVersion: response.data.version,
      });
      queryClient.invalidateQueries({ queryKey: ['shop'] });
      openSnackbar(`Version ${response.data.version} created`, 'success');
    },
    onError: (err: unknown) => {
      openSnackbar(getErrorMessage(err, 'Failed to create version'), 'error');
    },
  });
}

export default useCreateSnapshot;
