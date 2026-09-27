import ControllerProps from '../types/ControllerProps';
import { useMesh } from '../hooks/useMesh';
import TransformControlsController from './editor/TransformControlsController';
import RigidBodyController from './editor/RigidBodyController';
import { Select } from '@react-three/postprocessing';
import useComponents from '../hooks/useComponents';
import { createContext, ReactNode } from 'react';
import { Object3D } from 'three';

interface MeshContextValues {
  object: Object3D | null;
  setRef: (node: Object3D | null) => void;
}
export const MeshContext = createContext<MeshContextValues | undefined>(
  undefined,
);

interface MeshControllerTemplateProps {
  children: ReactNode;
}

export default function MeshControllerTemplate({
  entity,
  children,
}: ControllerProps & MeshControllerTemplateProps) {
  const { invisible, ColliderComponent, object, setRef } = useComponents(entity);
  const { hovered } = useMesh(entity);

  return (
    <MeshContext.Provider value={{ object, setRef }}>
      <TransformControlsController entity={entity} />
      {!invisible && (
        <RigidBodyController entity={entity}>
          <Select enabled={hovered === entity}>{children}</Select>
          <ColliderComponent entity={entity} />
        </RigidBodyController>
      )}
    </MeshContext.Provider>
  );
}
