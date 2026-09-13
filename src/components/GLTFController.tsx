import { useMesh } from '../hooks/useMesh';
import HighlightHelper from './HighlightHelper';
import { useEditorContext } from '../hooks/useEditorContext';
import useEntityManager from '../hooks/useEntityManager';
import GLTF from '../engine/components/GLTF';
import useDownloadFile from '../hooks/useDownloadFile';
import { Clone, useGLTF } from '@react-three/drei';
import { normalizeUrl } from '../engine/components/helpers/material';
import ControllerProps from '../types/ControllerProps';
import TransformControlsController from './editor/TransformControlsController';
import RigidBodyController from './editor/RigidBodyController';
import Collider from '../engine/components/Collider';
import ComponentNames from '../data/ComponentNames';
import Transform from '../engine/components/Transform';
import Invisible from '../engine/components/Invisible';
import useEntityRef from '../hooks/useEntityRef';
import { Select } from '@react-three/postprocessing';

export default function GLTFController({ entity }: ControllerProps) {
  const em = useEntityManager();
  const gltf = em.getComponent(GLTF, entity);
  const collider = em.getComponent(Collider, entity);
  const transform = em.getComponent(Transform, entity);
  const invisible = em.getComponent(Invisible, entity);
  const { focused, handleClick, handlePointerOver, handlePointerOut } =
    useMesh(entity);
  const { running, hovered } = useEditorContext();
  const { data: modelUrl } = useDownloadFile(gltf?.source);
  const model = useGLTF(
    modelUrl ? normalizeUrl(modelUrl) : '/error.glb',
    gltf?.useDraco,
    gltf?.useMeshOpt,
  );
  const [setRef, object] = useEntityRef(entity);

  let ColliderComponent = null;
  if (collider && collider.element) {
    ColliderComponent = ComponentNames[collider.element];
  }

  return (
    !invisible && (
      <TransformControlsController entity={entity} meshRef={object}>
        <RigidBodyController entity={entity}>
          <group>
            <Select enabled={hovered === entity}>
              <Clone
                object={model.scene}
                onClick={handleClick}
                onPointerOver={handlePointerOver}
                onPointerOut={handlePointerOut}
                ref={setRef}
              >
                <HighlightHelper
                  entity={entity}
                  focused={!running ? focused : ''}
                />
              </Clone>
            </Select>
            {ColliderComponent && (
              <ColliderComponent
                entity={entity}
                key={`${transform?.position} ${transform?.rotation}`}
              />
            )}
          </group>
        </RigidBodyController>
      </TransformControlsController>
    )
  );
}
