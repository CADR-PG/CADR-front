import ControllerProps from '../types/ControllerProps';
import { useMesh } from '../hooks/useMesh';
import TransformControlsController from './editor/TransformControlsController';
import RigidBodyController from './editor/RigidBodyController';
import { Select } from '@react-three/postprocessing';
import useComponents from '../hooks/useComponents';
import { ReactNode } from 'react';
import Parent from '@/engine/components/Parent';
import Transform from '@/engine/components/Transform';
import useEntityManager from '@/hooks/useEntityManager';

interface MeshControllerTemplateProps {
  children: ReactNode;
}

export default function MeshControllerTemplate({
  entity,
  children,
}: ControllerProps & MeshControllerTemplateProps) {
  const { invisible, object, ColliderComponent } = useComponents(entity);
  const { hovered } = useMesh(entity);
  const em = useEntityManager();
  const parent = em.getComponent(Parent, entity);
  const pPos =
    parent && parent.entity ? em.getComponent(Transform, parent.entity) : null;

  return (
    <>
      <TransformControlsController entity={entity} />
      {!invisible && (
        <RigidBodyController entity={entity} mesh={object}>
          <Select enabled={hovered === entity}>{children}</Select>
          <ColliderComponent entity={entity} />
        </RigidBodyController>
      )}
    </>
  );
}
