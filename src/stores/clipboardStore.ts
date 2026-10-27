import { create } from 'zustand';
import { Entity } from '@/engine/Entity';

interface State {
  clipboard: Entity | null;
}

interface Action {
  copy: (entity: Entity) => void;
  clear: () => void;
}

export const useClipboardStore = create<State & Action>((set) => ({
  clipboard: null,
  copy: (entity: Entity) => set(() => ({ clipboard: entity })),
  clear: () => set(() => ({ clipboard: null })),
}));
