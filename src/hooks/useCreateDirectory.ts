import { useMutation } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { createDirectory } from '../api/client';
import { useAssetsStore } from '../stores/assetsStore';

export default function useCreateDirectory() {
  const { uuid } = useParams<{ uuid: string }>();
  const addDirectory = useAssetsStore((s) => s.addDirectory);

  return useMutation({
    mutationFn: ({
      name,
      parentDirectoryId,
    }: {
      name: string;
      parentDirectoryId: string;
    }) => {
      if (!uuid) return Promise.reject(new Error('Project uuid is required!'));
      return createDirectory(uuid, name, parentDirectoryId);
    },
    onSuccess: (response, variables) => {
      addDirectory(variables.parentDirectoryId, response.data);
    },
    onError: (err) => console.error(err),
  });
}