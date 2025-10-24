import ControllerProps from '../types/ControllerProps';
import { useMesh } from '../hooks/useMesh';
import HighlightHelper from './HighlightHelper';
import { useSnapshot } from 'valtio';
import { ECS } from '../engine/ECS';

function GenericMesh({ children, entity, ...props }: ControllerProps) {
  const components = useSnapshot(ECS.instance.getComponents(entity));
  const componentKeys = Object.keys(components);

  const {
    focused,
    hovered,
    running,
    handleRef,
    handleClick,
    handlePointerOver,
    handlePointerOut,
  } = useMesh(entity);

  return (
    <mesh
      {...props}
      ref={handleRef}
      onClick={handleClick}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
    >
      <HighlightHelper
        entity={entity}
        focused={!running ? focused : ''}
        hovered={!running ? hovered : false}
      />
      {children}
    </mesh>
  );
}

export default GenericMesh;
