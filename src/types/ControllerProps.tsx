import { JSX, RefObject, ReactNode } from 'react';
import * as THREE from 'three';

interface ControllerProps extends React.ComponentProps<'mesh'> {
  parentCallback: (ref: RefObject<THREE.Mesh>) => void;
  children?: ReactNode;
}

export default ControllerProps;
