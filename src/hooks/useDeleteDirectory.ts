import { useMutation } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { deleteDirectory } from '../api/client';
import { useAssetsStore } from '../stores/assetsStore';

export default function useDeleteDirectory() {
  const { uuid } = useParams<{ uuid: string }>();
  const fetch = useAssetsStore((s) => s.fetch);

  return useMutation({
    mutationFn: (directoryId: string) => {
      if (!uuid) return Promise.reject(new Error('Project uuid is required!'));
      return deleteDirectory(uuid, directoryId);
    },
    onSuccess: () => {if (uuid) fetch(uuid)},
    onError: (err) => console.log(err)
  });
}
