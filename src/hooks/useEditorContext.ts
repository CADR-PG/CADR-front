import { useContext } from 'react';
import { EditorContext } from '../data/EditorContext';

export function useEditorContext() {
  const context = useContext(EditorContext);
  if (!context) {
    throw new Error(
      'useEditorContext must be used within EditorContext.Proivder',
    );
  }

  return context;
}
