import { useMutation, useQueryClient } from '@tanstack/react-query';
import { buyGame } from '../api/client';
import { useSnackbarStore } from '../stores/snackbarStore';
import { getErrorMessage } from '../utils/getErrorMessage';

function useBuyGame() {
  const queryClient = useQueryClient();
  const { openSnackbar } = useSnackbarStore();

  return useMutation({
    mutationFn: buyGame,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['shop', 'library'] });
      queryClient.invalidateQueries({ queryKey: ['shop', 'wallet'] });
      openSnackbar('Game added to your library', 'success');
    },
    onError: (err: unknown) => {
      openSnackbar(getErrorMessage(err, 'Failed to buy game'), 'error');
    },
  });
}

export default useBuyGame;
