import { createContext, Dispatch, SetStateAction } from 'react';
import { SceneObjects } from '../types/SceneObject';

export interface EditorContextValues {
  sceneObjects: SceneObjects;
  setSceneObjects: Dispatch<SetStateAction<SceneObjects>>;
  focused: string | null;
  focus: Dispatch<SetStateAction<string | null>>;
}

export const EditorContext = createContext<EditorContextValues | undefined>(
  undefined,
);
