import { useMutation } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { deleteDirectory } from '../api/client';
import { useAssetsStore } from '../stores/assetsStore';

export default function useDeleteDirectory() {
  const { uuid } = useParams<{ uuid: string }>();
  const removeDirectory = useAssetsStore((s) => s.removeDirectory);

  return useMutation({
    mutationFn: (directoryId: string) => {
      if (!uuid) return Promise.reject(new Error('Project uuid is required!'));
      return deleteDirectory(uuid, directoryId);
    },
    onSuccess: (_data, directoryId) => {
      removeDirectory(directoryId);
    },
    onError: (err) => console.error(err),
  });
}