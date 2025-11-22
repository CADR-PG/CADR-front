import { create } from 'zustand';

type User = {
  id?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  [key: string]: any;
};

interface UserState {
  user: User | null;
  setUser: (u: User | null) => void;
  updateUser: (partial: Partial<User>) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (u) => set({ user: u }),
  updateUser: (partial) =>
    set((state) => ({
      user: { ...(state.user ?? {}), ...partial },
    })),
  clearUser: () => set({ user: null }),
}));