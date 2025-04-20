import { ReactElement, RefObject } from "react";
import * as THREE from 'three';

export interface SceneObject {
  geometryType?: string;
  ref?: RefObject<THREE.Mesh>;
  component: ReactElement<any, any>
}

export interface SceneObjects {
  [uuid: string]: SceneObject
}
