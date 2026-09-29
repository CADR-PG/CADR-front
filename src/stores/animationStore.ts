import { Entity } from '@/engine/Entity';
import { create } from 'zustand';

interface State {
  playing: Record<Entity, string | null>;
}

interface Action {
  setPlaying: (name: string | null, entity: Entity) => void;
}

export const useAnimationStore = create<State & Action>((set) => ({
  playing: {},
  setPlaying: (name: string | null, entity: Entity) => {
    set((prev) => ({ playing: { ...prev.playing, [entity]: name } }));
  },
}));
