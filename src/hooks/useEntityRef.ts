import { useCallback, useState } from 'react';
import { Mesh } from 'three';
import { Group } from 'three';

export default function useEntityRef() {
  const [object, setObject] = useState<Mesh | Group | null>(null);

  const setRef = useCallback((node: Mesh | Group | null) => {
    setObject(node);
  }, []);

  return [setRef, object] as const;
}
