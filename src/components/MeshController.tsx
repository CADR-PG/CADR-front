import ControllerProps from '../types/ControllerProps';
import { useMesh } from '../hooks/useMesh';
import HighlightHelper from './HighlightHelper';
import useComponents from '../hooks/useComponents';
import MeshControllerTemplate from './MeshControllerTemplate';
import useEntityManager from '../hooks/useEntityManager';
import Mesh from '../engine/components/Mesh';

export default function MeshController({ entity, ...props }: ControllerProps) {
  const {
    renderComponents,
    transform,
    object,
    setRef,
    PositionalAudioComponent,
  } = useComponents(entity);
  const { focused, running, handleClick, handlePointerOver, handlePointerOut } =
    useMesh(entity);
  const em = useEntityManager();
  const mesh = em.getComponent(Mesh, entity);

  return (
    <MeshControllerTemplate entity={entity}>
      <mesh
        {...props}
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
    </MeshControllerTemplate>
  );
}
