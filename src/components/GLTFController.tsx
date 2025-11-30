import { useMesh } from '../hooks/useMesh';
import { useGLTF } from '@react-three/drei';
import { ReactNode } from 'react';
import HighlightHelper from './HighlightHelper';
import { useEditorContext } from '../hooks/useEditorContext';

interface GLTFProps {
  children?: ReactNode;
  objectUuid: string;
  url: string;
}

function GenericGLTF({ children, objectUuid, url, ...props }: GLTFProps) {
  const { focused, hovered, handleClick, handlePointerOver, handlePointerOut } =
    useMesh(objectUuid);
  const model = useGLTF(url);
  const { running } = useEditorContext();

  return (
    <primitive
      {...props}
      object={model.scene}
      onClick={handleClick}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
    >
      <HighlightHelper
        entity={objectUuid}
        focused={!running ? focused : ''}
        hovered={!running ? hovered : false}
      />
      {children}
    </primitive>
  );
}

export default GenericGLTF;
