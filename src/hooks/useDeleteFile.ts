import { useMutation } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { deleteFile } from '../api/client';
import { useAssetsStore } from '../stores/assetsStore';

export default function useDeleteFile() {
  const { uuid } = useParams<{ uuid: string }>();
  const fetch = useAssetsStore((s) => s.fetch);

  return useMutation({
    mutationFn: (fileId: string) => {
      if (!uuid) return Promise.reject(new Error('Project uuid is required!'));
      return deleteFile(uuid, fileId);
    },
    onSuccess: () => {if (uuid) fetch(uuid)},
    onError: (err) => console.log(err),
  });
}
