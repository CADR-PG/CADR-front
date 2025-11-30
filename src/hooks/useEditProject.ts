import { useMutation, useQueryClient } from '@tanstack/react-query';
import { modifyProject } from '../api/client';
import { AxiosError } from 'axios';
import ServerError from '../types/ServerError';
import { useSnackbarStore } from '../stores/snackbarStore';

function useEditProject() {
  const qc = useQueryClient();
  const { openSnackbar } = useSnackbarStore();

  return useMutation({
    mutationFn: ({
      uuid,
      data,
    }: {
      uuid: string;
      data: { name: string; description?: string };
    }) => modifyProject(uuid, { ...data, description: data.description ?? '' }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['projects'] });
    },
    onError: (err: unknown) => {
      const message =
        (err as AxiosError<ServerError>).response?.data.message ||
        'Failed to update project';
      openSnackbar(message, 'error');
    },
  });
}

export default useEditProject;
