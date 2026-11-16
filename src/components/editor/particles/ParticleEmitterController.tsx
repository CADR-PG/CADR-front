import { useEffect, useRef, useState } from 'react';
import { Group, TextureLoader } from 'three';
import { useFrame, useLoader } from '@react-three/fiber';
import ControllerProps from '../../../types/ControllerProps';
import useEntityManager from '../../../hooks/useEntityManager';
import ParticleEmitter from '../../../engine/components/ParticleEmitter';
import useParticleEmitter, {
  getParticleShapeTexture,
} from '../../../hooks/useParticleEmitter';
import { useEditorContext } from '../../../hooks/useEditorContext';

export default function ParticleEmitterController({ entity }: ControllerProps) {
  const em = useEntityManager();
  const { running, focus } = useEditorContext();
  const params = em.getComponent(ParticleEmitter, entity)!;
  const groupRef = useRef<Group>(null!);
  const [container, setContainer] = useState<Group | null>(null);
  const icon = useLoader(TextureLoader, getParticleShapeTexture('dot'));

  useEffect(() => {
    setContainer(groupRef.current);
  }, []);

  const system = useParticleEmitter({ container, params });

  useFrame((_, dt) => {
    system.current?.update(dt);
  });

  return (
    <group ref={groupRef}>
      {!running && (
        <sprite scale={0.5} onClick={() => focus(entity)}>
          <spriteMaterial
            depthWrite={false}
            map={icon}
            color={0x66ccff}
            transparent
          />
        </sprite>
      )}
    </group>
  );
}
