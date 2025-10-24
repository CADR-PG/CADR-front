import { ReactNode } from 'react';

interface ControllerProps extends React.ComponentProps<'mesh'> {
  children?: ReactNode;
  entity: string;
}

export default ControllerProps;
