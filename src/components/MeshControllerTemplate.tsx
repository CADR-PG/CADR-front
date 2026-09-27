import ControllerProps from '../types/ControllerProps';
import { useMesh } from '../hooks/useMesh';
import TransformControlsController from './editor/TransformControlsController';
import RigidBodyController from './editor/RigidBodyController';
import { Select } from '@react-three/postprocessing';
import useComponents from '../hooks/useComponents';
import { ReactNode } from 'react';
import { MeshContext } from '@/data/MeshContext';
import { useEditorContext } from '@/hooks/useEditorContext';
import useWorldTransform from '@/hooks/useWorldTransform';

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
  const t = useWorldTransform(entity);

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
          ) : (
            /* Show colliders in editor view. If game is running,
             * RigidBodyController should take that responsibility */
            <object3D
              position={t.position}
              rotation={t.rotation}
              scale={t.scale}
              visible={false}
            >
              <ColliderComponent entity={entity} />
            </object3D>
          )}
        </>
      )}
    </MeshContext.Provider>
  );
}
