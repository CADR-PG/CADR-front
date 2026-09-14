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
  const {
    renderComponents,
    invisible,
    transform,
    object,
    PositionalAudioComponent,
    ColliderComponent,
  } = useComponents(entity);
  const { hovered } = useMesh(entity);

  return (
    !invisible && (
      <TransformControlsController entity={entity} meshRef={object}>
        <RigidBodyController entity={entity} mesh={object}>
          <group>
            <Select enabled={hovered === entity}>{children}</Select>

            <ColliderComponent
              entity={entity}
              key={`${transform?.position} ${transform?.rotation} ${transform?.scale}`}
            />
            <PositionalAudioComponent entity={entity} parent={object} />

            {renderComponents()}
          </group>
        </RigidBodyController>
      </TransformControlsController>
    )
  );
}
