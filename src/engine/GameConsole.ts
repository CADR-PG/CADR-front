import { useConsoleStore } from '../stores/consoleStore';

// Public logging API for game code (think Unity's Debug.Log): call this
// from anywhere to print to the in-editor Console panel, e.g.
// `GameConsole.log(`Collected ${points} points`)` when the player picks
// something up.
const GameConsole = {
  log: (message: unknown) => useConsoleStore.getState().log(message, 'log'),
  warn: (message: unknown) => useConsoleStore.getState().log(message, 'warn'),
  error: (message: unknown) => useConsoleStore.getState().log(message, 'error'),
};

export default GameConsole;
