import { MeshContext } from '@/data/MeshContext';
import { useContext } from 'react';

export function useMeshContext() {
  const context = useContext(MeshContext);
  if (!context) {
    throw new Error('useMeshContext must be used within MeshContext.Provider');
  }

  return context;
}
