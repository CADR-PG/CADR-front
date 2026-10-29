export default interface EventState {
  mouse: { movementX: number; movementY: number };
  locked: boolean;
  input: Set<string>;
}
