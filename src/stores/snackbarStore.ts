import { create } from 'zustand';

interface State {
  message: string;
  severity: 'success' | 'warning' | 'error';
  open: boolean;
}

interface Action {
  openSnackbar: (message: string, severity: State['severity']) => void;
  closeSnackbar: () => void;
}

export const useSnackbarStore = create<State & Action>((set) => ({
  message: '',
  severity: 'success',
  open: false,
  openSnackbar: (message: string, severity: State['severity']) =>
    set(() => ({ message, severity, open: true })),
  closeSnackbar: () => set(() => ({ open: false })),
}));
