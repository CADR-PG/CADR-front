import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteProject as deleteProjectApi } from '../api/client';
import { AxiosError } from 'axios';
import { useSnackbarStore } from '../stores/snackbarStore';
import ServerError from '../types/ServerError';

export default function useDeleteProject() {
  const queryClient = useQueryClient();
  const { openSnackbar } = useSnackbarStore();

  return useMutation<void, AxiosError<ServerError>, string>({
    mutationFn: async (id: string) => {
      await deleteProjectApi(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      openSnackbar('Project deleted', 'success');
    },
    onError: (error) => {
      const msg = error?.response?.data.message || 'Failed to delete project';
      openSnackbar(msg, 'error');
    },
  });
}
