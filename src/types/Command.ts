export default interface Command {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  execute: (...args: any[]) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  undo: (...args: any[]) => void;
}
