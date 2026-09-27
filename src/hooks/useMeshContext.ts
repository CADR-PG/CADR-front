import { useContext } from 'react';
import { MeshContext } from '@/components/MeshControllerTemplate';

export function useMeshContext() {
  const context = useContext(MeshContext);
  if (!context) {
    throw new Error('useMeshContext must be used within MeshContext.Provider');
  }

  return context;
}
