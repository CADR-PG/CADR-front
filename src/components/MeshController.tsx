import ControllerProps from '../types/ControllerProps';
import { useMesh } from '../hooks/useMesh';
import HighlightHelper from './HighlightHelper';
import useComponents from '../hooks/useComponents';
import useEntityManager from '../hooks/useEntityManager';
import Mesh from '../engine/components/Mesh';
import { useMeshContext } from '@/hooks/useMeshContext';
import { useEffect } from 'react';

export default function MeshController({ entity }: ControllerProps) {
  const { renderComponents, transform, PositionalAudioComponent } =
    useComponents(entity);
  const { focused, running, handleClick, handlePointerOver, handlePointerOut } =
    useMesh(entity);
  const em = useEntityManager();
  const mesh = em.getComponent(Mesh, entity);
  const { object, setRef } = useMeshContext();

  useEffect(() => {
    console.log('Rerendered');
  });

  return (
    <mesh
      onClick={!running ? handleClick : undefined}
      onPointerOver={!running ? handlePointerOver : undefined}
      onPointerOut={!running ? handlePointerOut : undefined}
      position={transform?.position}
      rotation={[...transform?.rotation, 'YXZ']}
      scale={transform?.scale}
      ref={setRef}
      castShadow={mesh ? mesh.castShadow : false}
      receiveShadow={mesh ? mesh.receiveShadow : false}
    >
      <HighlightHelper entity={entity} focused={!running ? focused : ''} />
      <PositionalAudioComponent entity={entity} parent={object} />
      {renderComponents()}
    </mesh>
  );
}
