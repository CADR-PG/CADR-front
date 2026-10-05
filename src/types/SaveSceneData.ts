import { Asset } from '@/stores/editorSettingsStore';

interface SceneData {
  id: string;
  data: {
    currentScene: Asset | null;
    scenes: Asset[];
  };
}

export default SceneData;
