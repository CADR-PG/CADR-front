import { useCallback, useState } from 'react';
import { Object3D } from 'three';

export default function useEntityRef() {
  const [object, setObject] = useState<Object3D | null>(null);

  const setRef = useCallback((node: Object3D | null) => {
    setObject(node);
  }, []);

  return [setRef, object] as const;
}
