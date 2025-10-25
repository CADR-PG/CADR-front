import ControllerProps from '../types/ControllerProps';
import { useMesh } from '../hooks/useMesh';
import HighlightHelper from './HighlightHelper';
import { useSnapshot } from 'valtio';
import { ECS, mapComponentToElement } from '../engine/ECS';
import Transform from '../engine/components/Transform';
import { useEffect } from 'react';

function GenericMesh({ entity, ...props }: ControllerProps) {
  const components = useSnapshot(ECS.instance.getComponents(entity));
  const componentKeys = Object.keys(components);
  const transform = ECS.instance.getComponent(Transform, entity);
  const {
    focused,
    hovered,
    running,
    handleRef,
    handleClick,
    handlePointerOver,
    handlePointerOut,
  } = useMesh(entity);

  useEffect(() => {
    console.log(transform?.position);
  });

  return (
    <mesh
      {...props}
      ref={handleRef}
      onClick={handleClick}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
      position={transform?.position}
      rotation={transform?.rotation}
      scale={transform?.scale}
    >
      <HighlightHelper
        entity={entity}
        focused={!running ? focused : ''}
        hovered={!running ? hovered : false}
      />
      {componentKeys.map((component) => {
        const element = components[component].element;
        if (element) {
          console.log('rendering ' + element);
          const ComponentElement = mapComponentToElement[element];
          return <ComponentElement entity={entity} />;
        }
      })}
    </mesh>
  );
}

export default GenericMesh;
