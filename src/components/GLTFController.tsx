import { useMesh } from '../hooks/useMesh';
import HighlightHelper from './HighlightHelper';
import useDownloadFile from '../hooks/useDownloadFile';
import { Clone, useGLTF } from '@react-three/drei';
import { normalizeUrl } from '../engine/components/helpers/material';
import ControllerProps from '../types/ControllerProps';
import useComponents from '../hooks/useComponents';
import MeshControllerTemplate from './MeshControllerTemplate';

export default function GLTFController({ entity }: ControllerProps) {
  const {
    renderComponents,
    transform,
    object,
    gltf,
    setRef,
    PositionalAudioComponent,
  } = useComponents(entity);
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
        position={transform?.position}
        rotation={transform?.rotation}
        scale={transform?.scale}
        ref={setRef}
      >
        <HighlightHelper entity={entity} focused={!running ? focused : ''} />
        <PositionalAudioComponent entity={entity} parent={object} />
        {renderComponents()}
      </Clone>
    </MeshControllerTemplate>
  );
}
