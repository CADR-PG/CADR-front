import { ReactNode } from 'react';

interface ControllerProps extends React.ComponentProps<'mesh'> {
  children?: ReactNode;
  objectUuid: string;
}

export default ControllerProps;
