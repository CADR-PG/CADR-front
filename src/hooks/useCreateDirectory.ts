import { useMutation } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { createDirectory } from '../api/client';
import { useAssetsStore } from '../stores/assetsStore';
import { create } from 'axios';

export default function useCreateDirectory() {
  const { uuid } = useParams<{ uuid: string }>();
  const fetch = useAssetsStore((s) => s.fetch);

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
    onSuccess: () => {if (uuid) fetch(uuid)},
    onError: (err) => console.log(err)
  });
}
