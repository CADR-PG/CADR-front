import ControllerProps from '../types/ControllerProps';
import { useMesh } from '../hooks/useMesh';
import TransformControlsController from './editor/TransformControlsController';
import RigidBodyController from './editor/RigidBodyController';
import { Select } from '@react-three/postprocessing';
import useComponents from '../hooks/useComponents';
import { ReactNode } from 'react';

interface MeshControllerTemplateProps {
  children: ReactNode;
}

export default function MeshControllerTemplate({
  entity,
  children,
}: ControllerProps & MeshControllerTemplateProps) {
  const { invisible, object, ColliderComponent } = useComponents(entity);
  const { hovered } = useMesh(entity);

  return (
    !invisible && (
      <>
        <TransformControlsController entity={entity} />
        <RigidBodyController entity={entity} mesh={object}>
          <Select enabled={hovered === entity}>{children}</Select>
          <ColliderComponent entity={entity} />
        </RigidBodyController>
      </>
    )
  );
}
