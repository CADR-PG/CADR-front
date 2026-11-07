import { useMutation } from '@tanstack/react-query';
import { saveScene } from '../api/client';

function useSaveScene() {
  return useMutation({
    mutationFn: saveScene,
  });
}

export default useSaveScene;
