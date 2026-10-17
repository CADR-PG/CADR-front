import { useMutation, useQueryClient } from '@tanstack/react-query';
import { publishVersion } from '../api/client';
import { useSnackbarStore } from '../stores/snackbarStore';
import { getErrorMessage } from '../utils/getErrorMessage';

function usePublishVersion() {
  const queryClient = useQueryClient();
  const { openSnackbar } = useSnackbarStore();

  return useMutation({
    mutationFn: ({
      gameId,
      gameVersionId,
    }: {
      gameId: string;
      gameVersionId: string;
    }) => publishVersion(gameId, gameVersionId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['shop'] });
      openSnackbar('Version published', 'success');
    },
    onError: (err: unknown) => {
      openSnackbar(getErrorMessage(err, 'Failed to publish version'), 'error');
    },
  });
}

export default usePublishVersion;
