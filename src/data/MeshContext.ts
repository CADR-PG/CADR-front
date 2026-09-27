import { createContext } from 'react';
import { Object3D } from 'three';

interface MeshContextValues {
  object: Object3D | null;
  setRef: (node: Object3D | null) => void;
}
export const MeshContext = createContext<MeshContextValues | undefined>(
  undefined,
);
