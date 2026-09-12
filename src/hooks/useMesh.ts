import { ThreeEvent } from '@react-three/fiber';
import { useEditorContext } from '../hooks/useEditorContext';
import { Entity } from '../engine/Entity';

export function useMesh(entity: Entity) {
  const { focus, focused, hover, hovered, running } = useEditorContext();

  const handleClick = (e: ThreeEvent<PointerEvent>) => {
    if (!running) {
      e.stopPropagation();
      focus(entity);
    }
  };

  const handlePointerOver = (e: ThreeEvent<PointerEvent>) => {
    if (!running) {
      e.stopPropagation();
      hover(entity);
    }
  };

  const handlePointerOut = (e: ThreeEvent<PointerEvent>) => {
    if (!running) {
      e.stopPropagation();
      hover(null);
    }
  };

  const props = {
    handleClick,
    handlePointerOver,
    handlePointerOut,
    running,
    hovered,
    focused,
  };

  return props;
}
