import { useConsoleStore } from '../stores/consoleStore';

const GameConsole = {
  log: (message: unknown) => useConsoleStore.getState().log(message, 'log'),
  warn: (message: unknown) => useConsoleStore.getState().log(message, 'warn'),
  error: (message: unknown) => useConsoleStore.getState().log(message, 'error'),
};

export default GameConsole;
