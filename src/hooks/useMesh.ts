import { useState } from 'react';
import { ThreeEvent } from '@react-three/fiber';
import { useEditorContext } from '../hooks/useEditorContext';

export function useMesh(objectUuid: string) {
  const [hovered, hover] = useState(false);
  const [clicked, click] = useState(false);
  const { focus, focused, running } = useEditorContext();

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

  const props = {
    handleClick,
    handlePointerOver,
    handlePointerOut,
    running,
    hovered,
    clicked,
    focused,
  };

  return props;
}
