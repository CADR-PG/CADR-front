import ControllerProps from '../types/ControllerProps';
import { useMesh } from '../hooks/useMesh';
import TransformControlsController from './editor/TransformControlsController';
import RigidBodyController from './editor/RigidBodyController';
import { Select } from '@react-three/postprocessing';
import useComponents from '../hooks/useComponents';
import { ReactNode } from 'react';
import { MeshContext } from '@/data/MeshContext';
import { useEditorContext } from '@/hooks/useEditorContext';

interface MeshControllerTemplateProps {
  children: ReactNode;
}

export default function MeshControllerTemplate({
  entity,
  children,
}: ControllerProps & MeshControllerTemplateProps) {
  const { invisible, ColliderComponent, object, setRef } =
    useComponents(entity);
  const { hovered } = useMesh(entity);
  const { running } = useEditorContext();

  return (
    <MeshContext.Provider value={{ object, setRef }}>
      <TransformControlsController entity={entity} />
      {!invisible && (
        <>
          <Select enabled={hovered === entity}>{children}</Select>
          {running ? (
            <RigidBodyController entity={entity}>
              <ColliderComponent entity={entity} />
            </RigidBodyController>
          ) : null}
        </>
      )}
    </MeshContext.Provider>
  );
}
