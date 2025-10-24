export abstract class Component {
  static name: string;
  abstract element?: string;
}

// TODO: Since we don't know the potential arguments for component's constructor,
// let's just use `any` type. At the point of writing this, I have no idea if
// we ever even use constructors with arguments, so in the future we could
// possibly remove this eslint w/a.
export type ComponentType<T extends Component = Component> = new (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ...args: any[]
) => T;
