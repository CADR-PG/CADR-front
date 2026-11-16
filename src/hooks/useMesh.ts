import { ThreeEvent } from '@react-three/fiber';
import { useEditorContext } from '../hooks/useEditorContext';
import { Entity } from '../engine/Entity';
import { getNestedParent, isNestedScene } from '@/engine/Hierarchy';

export function useMesh(entity: Entity) {
  const { focus, focused, hover, hovered, running } = useEditorContext();

  const handleClick = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    if (!running && !isNestedScene(entity)) {
      focus(entity);
      return;
    }
    if (!running) {
      const parent = getNestedParent(entity);
      if (parent) focus(parent);
    }
  };

  const handlePointerOver = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    if (!running) {
      hover(entity);
    }
  };

  const handlePointerOut = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    if (!running) {
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
