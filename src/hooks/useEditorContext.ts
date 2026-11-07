import { useEditorStore } from '../stores/editorStore';

export function useEditorContext() {
  return useEditorStore();
}
