import { useMesh } from '../hooks/useMesh';
import HighlightHelper from './HighlightHelper';
import useDownloadFile from '../hooks/useDownloadFile';
import { Clone, useGLTF } from '@react-three/drei';
import { normalizeUrl } from '../engine/components/helpers/material';
import ControllerProps from '../types/ControllerProps';
import useComponents from '../hooks/useComponents';
import MeshControllerTemplate from './MeshControllerTemplate';

export default function GLTFController({ entity }: ControllerProps) {
  const { gltf, setRef } = useComponents(entity);
  const { focused, running, handleClick, handlePointerOver, handlePointerOut } =
    useMesh(entity);

  const { data: modelUrl } = useDownloadFile(gltf?.source);
  const model = useGLTF(
    modelUrl ? normalizeUrl(modelUrl) : '/error.glb',
    gltf?.useDraco,
    gltf?.useMeshOpt,
  );

  return (
    <MeshControllerTemplate entity={entity}>
      <Clone
        object={model.scene}
        onClick={handleClick}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        ref={setRef}
      >
        <HighlightHelper entity={entity} focused={!running ? focused : ''} />
      </Clone>
    </MeshControllerTemplate>
  );
}
