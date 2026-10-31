export default interface EventState {
  mouse: { movementX: number; movementY: number; buttons: number };
  locked: boolean;
  input: Set<string>;
}
