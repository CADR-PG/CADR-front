import { useMesh } from '../hooks/useMesh';
import HighlightHelper from './HighlightHelper';
import useDownloadFile from '../hooks/useDownloadFile';
import { useGLTF } from '@react-three/drei';
import { normalizeUrl } from '../engine/components/helpers/material';
import ControllerProps from '../types/ControllerProps';
import useComponents from '../hooks/useComponents';
import { useMeshContext } from '@/hooks/useMeshContext';
import { ReactNode, useEffect, useMemo } from 'react';
import { SkeletonUtils } from 'three-stdlib';
import { ECS } from '@/engine/ECS';
import { Entity } from '@/engine/Entity';
import { useAnimationStore } from '@/stores/animationStore';
import { AnimationMixer } from 'three';
import { useFrame } from '@react-three/fiber';
import { ref } from 'valtio';

interface AnimatedModelProps {
  entity: Entity;
  children: ReactNode[];
  url: string;
  useDraco?: boolean;
  useMeshOpt?: boolean;
}

function AnimatedModel({
  entity,
  children,
  url,
  useDraco,
  useMeshOpt,
}: AnimatedModelProps) {
  const { handleClick, handlePointerOver, handlePointerOut } = useMesh(entity);
  const { scene, animations } = useGLTF(url, useDraco, useMeshOpt);
  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const mixer = useMemo(() => new AnimationMixer(clone), [clone]);
  const actions = useMemo(
    () =>
      Object.fromEntries(
        animations.map((clip) => [clip.name, mixer.clipAction(clip)]),
      ),
    [mixer, animations],
  );

  useFrame((_, dt) => mixer.update(dt));

  useEffect(() => {
    const em = ECS.instance.entityManager;
    const { setClips, setPlaying } = useAnimationStore.getState();

    em.animations[entity] = ref(actions);
    setClips(
      animations.map((a) => a.name),
      entity,
    );
    setPlaying(null, entity);

    const onFinished = () => setPlaying(null, entity);
    mixer.addEventListener('finished', onFinished);

    return () => {
      mixer.removeEventListener('finished', onFinished);
      mixer.stopAllAction();
      if (em.animations[entity] === actions) delete em.animations[entity];
      setClips(null, entity);
      setPlaying(null, entity);
    };
  }, [entity, actions, animations, mixer]);

  return (
    <primitive
      object={clone}
      onClick={handleClick}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
    >
      {children}
    </primitive>
  );
}

export default function GLTFController({ entity }: ControllerProps) {
  const { renderComponents, transform, gltf, PositionalAudioComponent } =
    useComponents(entity);
  const { focused, running } = useMesh(entity);

  const { data: modelUrl } = useDownloadFile(gltf?.source);
  const { object, setRef } = useMeshContext();
  const url = modelUrl ? normalizeUrl(modelUrl) : '/error.glb';

  return (
    <group
      ref={setRef}
      position={transform?.position}
      rotation={transform?.rotation}
      scale={transform?.scale}
    >
      <AnimatedModel
        key={gltf?.source ?? 'error'}
        entity={entity}
        url={url}
        useDraco={gltf?.useDraco}
        useMeshOpt={gltf?.useMeshOpt}
      >
        <HighlightHelper entity={entity} focused={!running ? focused : ''} />
        <PositionalAudioComponent entity={entity} parent={object} />
        {renderComponents()}
      </AnimatedModel>
    </group>
  );
}
