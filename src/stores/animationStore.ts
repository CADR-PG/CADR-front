import { Entity } from '@/engine/Entity';
import { create } from 'zustand';

interface State {
  playing: Record<Entity, string | null>;
  clips: Record<Entity, string[] | null>;
}

interface Action {
  setPlaying: (name: string | null, entity: Entity) => void;
  setClips: (clips: string[] | null, entity: Entity) => void;
}

export const useAnimationStore = create<State & Action>((set) => ({
  playing: {},
  clips: {},
  setPlaying: (name: string | null, entity: Entity) => {
    set((prev) => ({ playing: { ...prev.playing, [entity]: name } }));
  },
  setClips: (clips: string[] | null, entity: Entity) => {
    set((prev) => ({ clips: { ...prev.clips, [entity]: clips } }));
  },
}));
