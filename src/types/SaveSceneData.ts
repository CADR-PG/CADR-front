import { Asset } from '@/stores/editorSettingsStore';

interface SceneData {
  id: string;
  data: {
    currentScene: number;
    scenes: (Asset | null)[];
  };
}

export default SceneData;
