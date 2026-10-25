import { create } from 'zustand';
import ConsoleLogEntry, { ConsoleLogLevel } from '../types/ConsoleLog';

const MAX_LOGS = 500;

interface State {
  logs: ConsoleLogEntry[];
}

interface Action {
  log: (message: unknown, level?: ConsoleLogLevel) => void;
  clear: () => void;
}

export const useConsoleStore = create<State & Action>((set) => ({
  logs: [
    {
      id: crypto.randomUUID(),
      level: 'log',
      message: 'Welcome to CADR Engine!',
      timestamp: Date.now(),
    },
  ],
  log: (message, level = 'log') =>
    set((state) => ({
      logs: [
        ...state.logs,
        {
          id: crypto.randomUUID(),
          level,
          message:
            typeof message === 'string' ? message : JSON.stringify(message),
          timestamp: Date.now(),
        },
      ].slice(-MAX_LOGS),
    })),
  clear: () => set({ logs: [] }),
}));
