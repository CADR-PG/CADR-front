import { SpotLight, SpotLightHelper, TextureLoader } from 'three';
import Light from '../../../engine/components/Light';
import useEntityManager from '../../../hooks/useEntityManager';
import ControllerProps from '../../../types/ControllerProps';
import { useRef } from 'react';
import { useHelper } from '@react-three/drei';
import SpotLightData from '../../../engine/components/lights/SpotLightData';
import { useEditorContext } from '../../../hooks/useEditorContext';
import { useLoader } from '@react-three/fiber';

export default function SpotLightController({ entity }: ControllerProps) {
  const colorMap = useLoader(TextureLoader, '/public/lightbulb.png');
  const { focus, focused, running } = useEditorContext();
  const em = useEntityManager();
  const lightData = em.getComponent(Light, entity);
  const ref = useRef<SpotLight>(null!);
  useHelper(focused === entity && ref, SpotLightHelper, 'red');
  let params;

  if (lightData) {
    params = lightData.data as SpotLightData;
  }

  return (
    params && (
      <group>
        <spotLight
          ref={ref}
          color={params.color}
          intensity={params.intensity}
          distance={params.distance}
          angle={params.distance}
          penumbra={params.penumbra}
          decay={params.decay}
          castShadow
        />

        {!running && (
          <sprite scale={0.5} onClick={() => focus(entity)}>
            <spriteMaterial depthWrite={false} map={colorMap} transparent />
          </sprite>
        )}
      </group>
    )
  );
}
