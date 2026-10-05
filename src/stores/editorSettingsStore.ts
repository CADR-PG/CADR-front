import { create } from 'zustand';

export interface Asset {
  id: string | null;
  name: string | null;
  directory: string | null;
}

interface State {
  scene: number;
  scenes: (Asset | null)[];
}

interface Action {
  setScene: (scene: number) => void;
  setScenes: (scenes: Asset[]) => void;
  pushScene: (scene: Asset | null) => void;
  removeScene: (index: number) => void;
  updateScene: (scene: Asset | null, index: number) => void;
}

const initialState: State = {
  scene: -1,
  scenes: [],
};

export const useEditorSettingsStore = create<State & Action>((set) => ({
  ...initialState,
  setScene: (scene: number) => {
    set({ scene });
  },
  setScenes: (scenes: Asset[]) => {
    set({ scenes });
  },
  pushScene: (scene: Asset | null) => {
    set((state) => ({ scenes: [...state.scenes, scene] }));
  },
  removeScene: (index: number) => {
    set((state) => {
      return {
        scene: index < state.scene ? state.scene - 1 : state.scene,
        scenes: state.scenes.filter((_, i) => i !== index),
      };
    });
  },
  updateScene: (scene, index) => {
    set((state) => ({
      scenes: state.scenes.map((s, i) => {
        if (i !== index) return s;
        if (!scene) return { id: null, name: null, directory: null };
        return { id: scene.id, name: scene.name, directory: scene.directory };
      }),
    }));
  },
}));
