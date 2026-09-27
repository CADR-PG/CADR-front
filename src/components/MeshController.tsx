import ControllerProps from '../types/ControllerProps';
import { useMesh } from '../hooks/useMesh';
import HighlightHelper from './HighlightHelper';
import useComponents from '../hooks/useComponents';
import MeshControllerTemplate from './MeshControllerTemplate';
import useEntityManager from '../hooks/useEntityManager';
import Mesh from '../engine/components/Mesh';
import { useMeshContext } from '@/hooks/useMeshContext';
import { useEffect } from 'react';
import { Vector3 } from 'three';
import RBody from '@/engine/components/RigidBody';

export default function MeshControllerWrapper({ entity }: ControllerProps) {
  return (
    <MeshControllerTemplate entity={entity}>
      <MeshController entity={entity} />
    </MeshControllerTemplate>
  );
}

function MeshController({ entity }: ControllerProps) {
  const { renderComponents, transform, PositionalAudioComponent } =
    useComponents(entity);
  const { focused, running, handleClick, handlePointerOver, handlePointerOut } =
    useMesh(entity);
  const em = useEntityManager();
  const mesh = em.getComponent(Mesh, entity);
  const { object, setRef } = useMeshContext();
  const rbody = em.getComponent(RBody, entity);

  useEffect(() => {
    if (!object || !transform) return;

    object.position.fromArray(transform.position);
    object.rotation.fromArray(transform.rotation);
    object.scale.fromArray(transform.scale);
  }, [object, running]);

  return (
    <mesh
      onClick={handleClick}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
      position={!running || !rbody ? transform?.position : undefined}
      rotation={!running || !rbody ? transform?.rotation : undefined}
      scale={!running || !rbody ? transform?.scale : undefined}
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
