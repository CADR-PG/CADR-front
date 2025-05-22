import { useMesh } from '../hooks/useMesh';
import { Helper, Outlines } from '@react-three/drei';
import { ReactNode } from 'react';
import { BoxHelper } from 'three';

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
      {children}
      {hovered ? <Outlines thickness={2} color="yellow" /> : null}
      {objectUuid == focused ? (
        <Helper type={BoxHelper} args={['yellow']} />
      ) : null}
    </primitive>
  );
}

export default GenericPrimitive;
