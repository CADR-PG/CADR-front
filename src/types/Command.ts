export default interface Command {
  execute: (...args: any[]) => void;
  undo: (...args: any[]) => void;
}
