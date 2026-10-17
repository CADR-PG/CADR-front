import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addGameToStore } from '../api/client';
import { useSnackbarStore } from '../stores/snackbarStore';
import { getErrorMessage } from '../utils/getErrorMessage';
import { setPublishedGame } from '../utils/publishedGames';
import { AddGameToStoreData } from '../types/Shop';

function useAddGameToStore() {
  const queryClient = useQueryClient();
  const { openSnackbar } = useSnackbarStore();

  return useMutation({
    mutationFn: ({
      projectId,
      data,
    }: {
      projectId: string;
      data: AddGameToStoreData;
    }) => addGameToStore(projectId, data),
    onSuccess: (response, { projectId }) => {
      setPublishedGame(projectId, {
        gameId: response.data.id,
        title: response.data.title,
        lastVersionId: response.data.activeVersionId,
      });
      queryClient.invalidateQueries({ queryKey: ['shop'] });
      openSnackbar('Game added to store', 'success');
    },
    onError: (err: unknown) => {
      openSnackbar(
        getErrorMessage(err, 'Failed to add game to store'),
        'error',
      );
    },
  });
}

export default useAddGameToStore;
