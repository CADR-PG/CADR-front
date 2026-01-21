import { useRef } from 'react';
import Light from '../../../engine/components/Light';
import DirectionalLightData from '../../../engine/components/lights/DirectionalLightData';
import useEntityManager from '../../../hooks/useEntityManager';
import ControllerProps from '../../../types/ControllerProps';
import { DirectionalLight, DirectionalLightHelper, TextureLoader } from 'three';
import { useHelper } from '@react-three/drei';
import { useEditorContext } from '../../../hooks/useEditorContext';
import { useLoader } from '@react-three/fiber';

export default function DirectionalLightController({
  entity,
}: ControllerProps) {
  const colorMap = useLoader(TextureLoader, '/public/lightbulb.png');
  const { focus, focused } = useEditorContext();
  const em = useEntityManager();
  const lightData = em.getComponent(Light, entity);
  const ref = useRef<DirectionalLight>(null!);
  useHelper(focused === entity && ref, DirectionalLightHelper, 1, 'red');
  let params;

  if (lightData) {
    params = lightData.data as DirectionalLightData;
  }

  return (
    params && (
      <group>
        <directionalLight
          ref={ref}
          color={params.color}
          intensity={params.intensity}
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
