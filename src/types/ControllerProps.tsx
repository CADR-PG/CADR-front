import { RefObject, ReactNode } from 'react';
import * as THREE from 'three';

interface ControllerProps extends React.ComponentProps<'mesh'> {
  children?: ReactNode;
}

export default ControllerProps;
