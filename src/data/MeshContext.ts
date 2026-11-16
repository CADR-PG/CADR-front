import { createContext } from 'react';
import { Group, Mesh } from 'three';

interface MeshContextValues {
  object: Mesh | Group | null;
  setRef: (node: Mesh | Group | null) => void;
}
export const MeshContext = createContext<MeshContextValues | undefined>(
  undefined,
);
