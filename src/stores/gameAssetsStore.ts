import { create } from 'zustand';
import type { PlayGameReadModel } from '../types/Shop';
import { useEditorSettingsStore } from './editorSettingsStore';

interface State {
  gameId: string | null;
  assets: Record<string, string>;
}

interface Action {
  setSession: (session: PlayGameReadModel) => void;
  clear: () => void;
}

const initialState: State = {
  gameId: null,
  assets: {},
};

export const useGameAssetsStore = create<State & Action>((set) => ({
  ...initialState,
  setSession: (session) => {
    const assets = Object.fromEntries(
      session.assets.map((asset) => [asset.path, asset.url]),
    );
    set({ gameId: session.gameId, assets });

    useEditorSettingsStore
      .getState()
      .setGame(session.assets[0]?.path ?? null);
  },
  clear: () => {
    set(initialState);
  },
}));
