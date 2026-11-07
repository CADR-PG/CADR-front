import { SetStateAction } from 'react';
import { create } from 'zustand';
import { Camera } from 'three';
import EditingMode from '../types/EditingMode';
import { ECS } from '../engine/ECS';
import { GAME_SCENE } from '../engine/EntityManager';
import { loadScene } from '../engine/Scene';
import { stopAllAnimations } from '../engine/Animation';
import { useEditorSettingsStore } from './editorSettingsStore';

interface State {
  projectId: string | null;
  focused: string | null;
  hovered: string | null;
  dragged: boolean;
  gDragged: boolean;
  dnd: string | null;
  running: boolean;
  editingMode: EditingMode;
  camera: Camera;
}

interface Action {
  setProjectId: (projectId: string | null) => void;
  focus: (value: SetStateAction<string | null>) => void;
  hover: (value: SetStateAction<string | null>) => void;
  drag: (value: SetStateAction<boolean>) => void;
  gDrag: (value: SetStateAction<boolean>) => void;
  setDnd: (value: SetStateAction<string | null>) => void;
  selectMode: (value: SetStateAction<EditingMode>) => void;
  setCamera: (value: SetStateAction<Camera>) => void;
  setRunning: (newState: boolean, current: boolean | null) => Promise<void>;
  reset: () => void;
}

const initialState: State = {
  projectId: null,
  focused: null,
  hovered: null,
  dragged: false,
  gDragged: false,
  dnd: null,
  running: false,
  editingMode: 'translate',
  camera: null!,
};

function resolve<T>(value: SetStateAction<T>, prev: T): T {
  return typeof value === 'function' ? (value as (prev: T) => T)(prev) : value;
}

export const useEditorStore = create<State & Action>((set, get) => ({
  ...initialState,
  setProjectId: (projectId) => set({ projectId }),
  focus: (value) => set((s) => ({ focused: resolve(value, s.focused) })),
  hover: (value) => set((s) => ({ hovered: resolve(value, s.hovered) })),
  drag: (value) => set((s) => ({ dragged: resolve(value, s.dragged) })),
  gDrag: (value) => set((s) => ({ gDragged: resolve(value, s.gDragged) })),
  setDnd: (value) => set((s) => ({ dnd: resolve(value, s.dnd) })),
  selectMode: (value) =>
    set((s) => ({ editingMode: resolve(value, s.editingMode) })),
  setCamera: (value) => set((s) => ({ camera: resolve(value, s.camera) })),
  setRunning: async (newState, current) => {
    stopAllAnimations();

    const { running, projectId } = get();
    const { scenes, game } = useEditorSettingsStore.getState();
    const em = ECS.instance.entityManager;

    if (!running && newState) {
      const editorIdx = em.currentScene;
      em.enterGame();

      try {
        if (current) {
          const scene = scenes[editorIdx];
          if (!scene?.id)
            throw new Error('Current scene has no file (unsaved?)');
          await loadScene(
            projectId ?? '',
            {
              id: scene.id,
              name: scene.name!,
              directoryId: scene.directoryId!,
            },
            GAME_SCENE,
          );
        } else {
          if (!game) throw new Error('No main game scene set');
          await loadScene(
            projectId ?? '',
            { id: game, name: 'dummy', directoryId: 'dummy' },
            GAME_SCENE,
          );
        }
      } catch (e) {
        console.error('Failed to start game', e);
        em.exitGame();
        return;
      }

      ECS.instance.isRunning = true;
      set({ running: true });
    }

    if (running && !newState) {
      set({ running: false });
      ECS.instance.isRunning = false;
      em.exitGame();
    }
  },
  reset: () => set(initialState),
}));
