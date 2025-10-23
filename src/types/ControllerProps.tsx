import { ReactNode } from 'react';

interface ControllerProps extends React.ComponentProps<'mesh'> {
  children?: ReactNode;
  objectUuid: string;
  running?: boolean;
}

export default ControllerProps;
