export abstract class Component {
  static name: string;
}

// TODO: Since we don't know the potential arguments for component's constructor,
// let's just use `any` type. At the point of writing this, I have no idea if
// we ever even use constructors with arguments, so in the future we could
// possibly remove this eslint w/a.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ComponentType<T extends Component> = new (...args: any[]) => T;
