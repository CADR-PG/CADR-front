import { useCallback, useState } from 'react';
import { ThreeEvent } from '@react-three/fiber';
import * as THREE from 'three';
import { useEditorContext } from '../hooks/useEditorContext';

export function useMesh(objectUuid: string) {
  const [hovered, hover] = useState(false);
  const [clicked, click] = useState(false);
  const { focus, focused, running, setSceneObjects } = useEditorContext();

  const handleClick = (e: ThreeEvent<PointerEvent>) => {
    if (!running) {
      e.stopPropagation();
      click(!clicked);
      focus(objectUuid);
    }
  };

  const handlePointerOver = (e: ThreeEvent<PointerEvent>) => {
    if (!running) {
      e.stopPropagation();
      hover(true);
    }
  };

  const handlePointerOut = (e: ThreeEvent<PointerEvent>) => {
    if (!running) {
      e.stopPropagation();
      hover(false);
    }
  };

  const handleRef = useCallback(
    (node: THREE.Mesh) => {
      // this piece of shit took like an hour of my life
      // because it fires when the ref gets set to null
      if (!node) return;

      setSceneObjects((prevObjects) => ({
        ...prevObjects,
        [objectUuid]: {
          ...prevObjects[objectUuid],
          ref: node,
        },
      }));
    },
    [objectUuid, setSceneObjects],
  );

  const props = {
    handleClick,
    handlePointerOver,
    handlePointerOut,
    handleRef,
    running,
    hovered,
    clicked,
    focused,
  };

  return props;
}
