import { useMesh } from '../hooks/useMesh';
import HighlightHelper from './HighlightHelper';
import useDownloadFile from '../hooks/useDownloadFile';
import { useAnimations, useGLTF } from '@react-three/drei';
import { normalizeUrl } from '../engine/components/helpers/material';
import ControllerProps from '../types/ControllerProps';
import useComponents from '../hooks/useComponents';
import { useMeshContext } from '@/hooks/useMeshContext';
import { useEffect, useMemo, useRef } from 'react';
import { Group } from 'three';
import { SkeletonUtils } from 'three-stdlib';
import { ECS } from '@/engine/ECS';

export default function GLTFController({ entity }: ControllerProps) {
  const { renderComponents, transform, gltf, PositionalAudioComponent } =
    useComponents(entity);
  const { focused, running, handleClick, handlePointerOver, handlePointerOut } =
    useMesh(entity);

  const { data: modelUrl } = useDownloadFile(gltf?.source);
  const { scene, animations } = useGLTF(
    modelUrl ? normalizeUrl(modelUrl) : '/error.glb',
    gltf?.useDraco,
    gltf?.useMeshOpt,
  );
  const { object, setRef } = useMeshContext();
  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const animRoot = useRef<Group>(null);
  const { actions } = useAnimations(animations, animRoot);

  useEffect(() => {
    if (!gltf) return;
    // gltf.animations = actions;
    ECS.instance.entityManager.animations[entity] = actions;
  }, [modelUrl, gltf, actions]);

  return (
    <group
      ref={setRef}
      position={transform?.position}
      rotation={transform?.rotation}
      scale={transform?.scale}
    >
      <group ref={animRoot}>
        <primitive
          object={clone}
          onClick={handleClick}
          onPointerOver={handlePointerOver}
          onPointerOut={handlePointerOut}
        >
          <HighlightHelper entity={entity} focused={!running ? focused : ''} />
          <PositionalAudioComponent entity={entity} parent={object} />
          {renderComponents()}
        </primitive>
      </group>
    </group>
  );
}
