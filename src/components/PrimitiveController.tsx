import { useMesh } from '../hooks/useMesh';
import { ReactNode } from 'react';
import HighlightHelper from './HighlightHelper';

interface PrimitiveProps extends React.ComponentProps<'primitive'> {
  children?: ReactNode;
  objectUuid: string;
}

function GenericPrimitive({ children, objectUuid, ...props }: PrimitiveProps) {
  const {
    focused,
    hovered,
    handleRef,
    handleClick,
    handlePointerOver,
    handlePointerOut,
  } = useMesh(objectUuid);

  return (
    <primitive
      {...props}
      ref={handleRef}
      onClick={handleClick}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
    >
      <HighlightHelper
        objectUuid={objectUuid}
        focused={focused}
        hovered={hovered}
      />
      {children}
    </primitive>
  );
}

export default GenericPrimitive;
