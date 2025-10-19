import { createContext, Dispatch, SetStateAction } from 'react';
import { SceneObjects } from '../types/SceneObject';

export interface EditorContextValues {
  sceneObjects: SceneObjects;
  setSceneObjects: Dispatch<SetStateAction<SceneObjects>>;
  focused: string | null;
  focus: Dispatch<SetStateAction<string | null>>;
  running: boolean; // nowy stan
  setRunning: Dispatch<SetStateAction<boolean>>;
}

export const EditorContext = createContext<EditorContextValues | undefined>(
  undefined,
);
