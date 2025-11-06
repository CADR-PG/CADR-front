import { useState } from 'react';
import { ThreeEvent } from '@react-three/fiber';
import { useEditorContext } from '../hooks/useEditorContext';

export function useMesh(objectUuid: string) {
  const [hovered, hover] = useState(false);
  const [clicked, click] = useState(false);
  const { focus, focused } = useEditorContext();

  const handleClick = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    click(!clicked);
    focus(objectUuid);
  };

  const handlePointerOver = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    hover(true);
  };

  const handlePointerOut = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    hover(false);
  };

  const props = {
    handleClick,
    handlePointerOver,
    handlePointerOut,
    hovered,
    clicked,
    focused,
  };

  return props;
}
