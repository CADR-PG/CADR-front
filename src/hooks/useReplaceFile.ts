import { useMutation } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { requestFileUpload, uploadFileStorage } from '../api/client';

export default function useReplaceFile() {
  const { uuid } = useParams<{ uuid: string }>();

  return useMutation({
    mutationFn: async ({ file, id }: { file: File; id: string }) => {
      if (!uuid) return Promise.reject(new Error('Project uuid is required!'));

      const { data } = await requestFileUpload(uuid, id);
      console.log(data);
      await uploadFileStorage(data.downloadUrl, file);

      return { data };
    },
    onSuccess(data) {
      console.log(data);
    },
    onError: (err) => console.error(err),
  });
}
