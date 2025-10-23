import ControllerProps from '../types/ControllerProps';
import { useMesh } from '../hooks/useMesh';
import HighlightHelper from './HighlightHelper';
import { ThreeEvent } from '@react-three/fiber';
import { useEditorContext } from '../hooks/useEditorContext';

function GenericMesh({ children, objectUuid, ...props }: ControllerProps) {
  const {
    focused,
    hovered,
    handleRef,
    handleClick,
    handlePointerOver,
    handlePointerOut,
  } = useMesh(objectUuid);

  const {running} = useEditorContext();
  return (
    <mesh
      {...props}
      ref={handleRef}
      onClick={(e: ThreeEvent<PointerEvent>) => {
        if (!running) handleClick(e);
      }}
      onPointerOver={(e: ThreeEvent<PointerEvent>) => {
        if (!running) handlePointerOver(e);
      }}
      onPointerOut={(e: ThreeEvent<PointerEvent>)=>{
        if (!running) handlePointerOut(e);
      }}
    >
      <HighlightHelper
        objectUuid={objectUuid}
        focused={!running ? focused : false}
        hovered={!running ? hovered : false}
      />
      {children}
    </mesh>
  );
}

export default GenericMesh;
