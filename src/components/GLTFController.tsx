import { useMesh } from '../hooks/useMesh';
import { useGLTF } from '@react-three/drei';
import { ReactNode } from 'react';
import HighlightHelper from './HighlightHelper';

interface GLTFProps {
  children?: ReactNode;
  objectUuid: string;
  url: string;
}

function GenericGLTF({ children, objectUuid, url, ...props }: GLTFProps) {
  const {
    focused,
    hovered,
    handleRef,
    handleClick,
    handlePointerOver,
    handlePointerOut,
  } = useMesh(objectUuid);
  const model = useGLTF(url);

  return (
    <primitive
      {...props}
      object={model.scene}
      ref={handleRef}
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

export default GenericGLTF;
