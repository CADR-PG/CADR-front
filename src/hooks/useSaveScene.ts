import { useMutation } from '@tanstack/react-query';
import { saveScene } from '../api/client';
import { useSnackbarStore } from '../stores/snackbarStore';

function useSaveScene() {
  const { openSnackbar } = useSnackbarStore();

  return useMutation({
    mutationFn: saveScene,
    onSuccess: () => {
      openSnackbar('Scene saved', 'success');
    },
  });
}

export default useSaveScene;
