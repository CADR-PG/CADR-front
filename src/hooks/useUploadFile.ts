import { useMutation } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { registerFile, uploadFileStorage } from '../api/client';

export default function useUploadFile() {
  const { uuid } = useParams<{ uuid: string }>();

  return useMutation({
    mutationFn: async ({
      file,
      directoryId,
    }: {
      file: File;
      directoryId: string;
    }) => {
      const { data } = await registerFile(
        uuid!,
        file.name,
        directoryId,
        file.size,
      );
      console.log('uploadURL:', data.uploadUrl);
      await uploadFileStorage(data.uploadUrl, file);
      return data;
    },
  });
}
