import { useCallback, useState } from 'react';
import { Entity } from '../engine/Entity';
import { Object3D } from 'three';

export default function useEntityRef(entity: Entity) {
  const [object, setObject] = useState<Object3D | null>(null);

  const setRef = useCallback(
    (node: Object3D | null) => {
      setObject(node);
    },
    [entity],
  );

  return [setRef, object] as const;
}
