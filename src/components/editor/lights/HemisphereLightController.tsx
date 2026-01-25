import { HemisphereLight, HemisphereLightHelper, TextureLoader } from 'three';
import Light from '../../../engine/components/Light';
import useEntityManager from '../../../hooks/useEntityManager';
import ControllerProps from '../../../types/ControllerProps';
import { useRef } from 'react';
import { useHelper } from '@react-three/drei';
import HemisphereLightData from '../../../engine/components/lights/HemisphereLightData';
import { useEditorContext } from '../../../hooks/useEditorContext';
import { useLoader } from '@react-three/fiber';

export default function HemisphereLightController({ entity }: ControllerProps) {
  const colorMap = useLoader(TextureLoader, '/public/lightbulb.png');
  const { focused, focus, running } = useEditorContext();
  const em = useEntityManager();
  const lightData = em.getComponent(Light, entity);
  const ref = useRef<HemisphereLight>(null!);
  useHelper(focused && ref, HemisphereLightHelper, 1, 'red');
  let params;

  if (lightData) {
    params = lightData.data as HemisphereLightData;
  }

  return (
    params && (
      <group>
        <hemisphereLight
          ref={ref}
          color={params.skyColor}
          groundColor={params.groundColor}
          intensity={params.intensity}
          castShadow={params.castShadow}
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
