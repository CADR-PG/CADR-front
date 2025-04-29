import { createContext, Dispatch, SetStateAction } from 'react';
import { SceneObjects } from '../types/SceneObject';
import * as THREE from 'three';

export interface EditorContextValues {
  sceneObjects: SceneObjects;
  setSceneObjects: Dispatch<SetStateAction<SceneObjects>>;
  focused: string | null;
  focus: Dispatch<SetStateAction<string | null>>;
  updateFocusedObject: (object: THREE.Mesh) => void
}

export const EditorContext = createContext<EditorContextValues | undefined>(
  undefined,
);
