import { createContext, Dispatch, SetStateAction } from 'react';
import EditingMode from '../types/EditingMode';

export interface EditorContextValues {
  focused: string | null;
  focus: Dispatch<SetStateAction<string | null>>;
  running: boolean;
  setRunning: (newState: boolean) => void;
  editingMode: EditingMode;
  selectMode: Dispatch<SetStateAction<EditingMode>>;
  hovered: string | null;
  hover: Dispatch<SetStateAction<string | null>>;
  dragged: boolean;
  drag: Dispatch<SetStateAction<boolean>>;
  gDragged: boolean;
  gDrag: Dispatch<SetStateAction<boolean>>;
  dnd: string | null;
  setDnd: Dispatch<SetStateAction<string | null>>;
  scene: string | null;
  setScene: Dispatch<SetStateAction<string | null>>;
  scenes: string[];
  setScenes: Dispatch<SetStateAction<string[]>>;
}

export const EditorContext = createContext<EditorContextValues | undefined>(
  undefined,
);
