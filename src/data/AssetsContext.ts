import { createContext, useContext } from 'react';

interface AssetsContextValue {
  selectedId: string;
  onSelect: (id: string, name: string) => void;
}

export const AssetsContext = createContext<AssetsContextValue | null>(null);

export const useAssetsContext = () => {
  const ctx = useContext(AssetsContext);
  if (!ctx) throw new Error('useAssetsContext must be used within AssetsContext.Provider');
  return ctx;
};