import ControllerProps from '../types/ControllerProps';
import { useMesh } from '../hooks/useMesh';
import HighlightHelper from './HighlightHelper';

function GenericMesh({ children, objectUuid, ...props }: ControllerProps) {
  const {
    focused,
    hovered,
    running,
    handleRef,
    handleClick,
    handlePointerOver,
    handlePointerOut,
  } = useMesh(objectUuid);

  return (
    <mesh
      {...props}
      ref={handleRef}
      onClick={handleClick}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
    >
      <HighlightHelper
        objectUuid={objectUuid}
        focused={!running ? focused : ""}
        hovered={!running ? hovered : false}
      />
      {children}
    </mesh>
  );
}

export default GenericMesh;
