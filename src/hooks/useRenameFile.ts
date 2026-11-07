import { useMutation } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { renameFile } from '../api/client';
import { useAssetsStore } from '../stores/assetsStore';

export default function useRenameFile() {
  const { uuid } = useParams<{ uuid: string }>();
  const renameFileInStore = useAssetsStore((s) => s.renameFile);

  return useMutation({
    mutationFn: ({ fileId, name }: { fileId: string; name: string }) => {
      if (!uuid) return Promise.reject(new Error('Project uuid is required!'));
      return renameFile(uuid, fileId, name);
    },
    onSuccess: (_data, { fileId, name }) => {
      renameFileInStore(fileId, name);
    },
    onError: (err) => console.error(err),
  });
}
