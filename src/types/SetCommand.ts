import Command from './Command';

export default interface SetCommand<T> extends Command {
  previousState: T;
}
