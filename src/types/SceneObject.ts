import { JSX } from 'react';
import * as THREE from 'three';
import ControllerProps from './ControllerProps';

export interface SceneObject {
  id: number;
  name: string;
  ref?: THREE.Mesh;
  component: ({ children, ...props }: ControllerProps) => JSX.Element;
}

export interface SceneObjects {
  [uuid: string]: SceneObject;
}
