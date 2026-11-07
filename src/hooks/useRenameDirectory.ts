import { useMutation } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { renameDirectory } from '../api/client';
import { useAssetsStore } from '../stores/assetsStore';

export default function useRenameDirectory() {
  const { uuid } = useParams<{ uuid: string }>();
  const renameDirectoryInStore = useAssetsStore((s) => s.renameDirectory);

  return useMutation({
    mutationFn: ({
      directoryId,
      name,
    }: {
      directoryId: string;
      name: string;
    }) => {
      if (!uuid) return Promise.reject(new Error('Project uuid is required!'));
      return renameDirectory(uuid, directoryId, name);
    },
    onSuccess: (_data, { directoryId, name }) => {
      renameDirectoryInStore(directoryId, name);
    },
    onError: (err) => console.error(err),
  });
}
