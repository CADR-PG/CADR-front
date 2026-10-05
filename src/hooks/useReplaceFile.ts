import { useMutation } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { requestFileUpload, uploadFileStorage } from '../api/client';

export default function useReplaceFile() {
  const { uuid } = useParams<{ uuid: string }>();

  return useMutation({
    mutationFn: async ({ file }: { file: File }) => {
      if (!uuid) return Promise.reject(new Error('Project uuid is required!'));

      const { data } = await requestFileUpload(uuid, file.name);
      await uploadFileStorage(data.uploadUrl, file);

      return { data };
    },
    onError: (err) => console.error(err),
  });
}
