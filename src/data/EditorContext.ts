import { createContext, Dispatch, SetStateAction } from 'react';
import EditingMode from '../types/EditingMode';

export interface EditorContextValues {
  focused: string | null;
  focus: Dispatch<SetStateAction<string | null>>;
  running: boolean;
  setRunning: (value: boolean) => void;
  editingMode: EditingMode;
  selectMode: Dispatch<SetStateAction<EditingMode>>;
}

export const EditorContext = createContext<EditorContextValues | undefined>(
  undefined,
);
