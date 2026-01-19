import { useRef } from 'react';
import useEntityManager from '../../../hooks/useEntityManager';
import ControllerProps from '../../../types/ControllerProps';
import PointLightData from '../../../engine/components/lights/PointLightData';
import { useHelper } from '@react-three/drei';
import { PointLight, PointLightHelper } from 'three';
import Light from '../../../engine/components/Light';

export default function PointLightController({ entity }: ControllerProps) {
  const em = useEntityManager();
  const lightData = em.getComponent(Light, entity);
  const ref = useRef<PointLight>(null!);
  useHelper(ref, PointLightHelper, 1, 'red');
  let params;

  if (lightData) {
    params = lightData.data as PointLightData;
  }

  return (
    params && (
      <pointLight
        ref={ref}
        color={params.color}
        intensity={params.intensity}
        distance={params.distance}
        decay={params.decay}
      />
    )
  );
}
