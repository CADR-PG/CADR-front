import ControllerProps from '../types/ControllerProps';
import { useMesh } from '../hooks/useMesh';
import HighlightHelper from './HighlightHelper';
import useComponents from '../hooks/useComponents';
import useEntityManager from '../hooks/useEntityManager';
import Mesh from '../engine/components/Mesh';
import { useMeshContext } from '@/hooks/useMeshContext';

export default function MeshController({ entity }: ControllerProps) {
  const { renderComponents, transform, PositionalAudioComponent } =
    useComponents(entity);
  const { focused, running, handleClick, handlePointerOver, handlePointerOut } =
    useMesh(entity);
  const em = useEntityManager();
  const mesh = em.getComponent(Mesh, entity);
  const { object, setRef } = useMeshContext();

  return (
    <mesh
      onClick={handleClick}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
      position={transform?.position}
      rotation={transform?.rotation}
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
