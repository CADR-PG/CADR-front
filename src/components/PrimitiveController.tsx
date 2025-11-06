import { useMesh } from '../hooks/useMesh';
import { ReactNode } from 'react';
import HighlightHelper from './HighlightHelper';

interface PrimitiveProps extends React.ComponentProps<'primitive'> {
  children?: ReactNode;
  objectUuid: string;
}

function GenericPrimitive({ children, objectUuid, ...props }: PrimitiveProps) {
  const { focused, hovered, handleClick, handlePointerOver, handlePointerOut } =
    useMesh(objectUuid);

  return (
    <primitive
      {...props}
      onClick={handleClick}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
    >
      <HighlightHelper
        entity={objectUuid}
        focused={focused}
        hovered={hovered}
      />
      {children}
    </primitive>
  );
}

export default GenericPrimitive;
