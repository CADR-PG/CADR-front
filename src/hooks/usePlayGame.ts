import { useMutation, useQueryClient } from '@tanstack/react-query';
import { playGame } from '../api/client';
import { useSnackbarStore } from '../stores/snackbarStore';
import { getErrorMessage } from '../utils/getErrorMessage';

function usePlayGame() {
  const queryClient = useQueryClient();
  const { openSnackbar } = useSnackbarStore();

  return useMutation({
    mutationFn: playGame,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['shop', 'popular'] });
    },
    onError: (err: unknown) => {
      openSnackbar(getErrorMessage(err, 'Failed to launch game'), 'error');
    },
  });
}

export default usePlayGame;
