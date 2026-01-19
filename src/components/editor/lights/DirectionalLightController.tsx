import { useRef } from 'react';
import Light from '../../../engine/components/Light';
import DirectionalLightData from '../../../engine/components/lights/DirectionalLightData';
import useEntityManager from '../../../hooks/useEntityManager';
import ControllerProps from '../../../types/ControllerProps';
import { DirectionalLight, DirectionalLightHelper } from 'three';
import { useHelper } from '@react-three/drei';

export default function DirectionalLightController({
  entity,
}: ControllerProps) {
  const em = useEntityManager();
  const lightData = em.getComponent(Light, entity);
  const ref = useRef<DirectionalLight>(null!);
  useHelper(ref, DirectionalLightHelper, 1, 'red');
  let params;

  if (lightData) {
    params = lightData.data as DirectionalLightData;
  }

  return (
    params && (
      <directionalLight
        ref={ref}
        color={params.color}
        intensity={params.intensity}
      />
    )
  );
}
