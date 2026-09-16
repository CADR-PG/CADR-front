import { useRef } from 'react';
import useEntityManager from '../../../hooks/useEntityManager';
import ControllerProps from '../../../types/ControllerProps';
import PointLightData from '../../../engine/components/lights/PointLightData';
import { useHelper } from '@react-three/drei';
import { PointLight, PointLightHelper } from 'three';
import Light from '../../../engine/components/Light';
import { useEditorContext } from '../../../hooks/useEditorContext';
import LightTemplate from './LightTemplate';

export default function PointLightController({ entity }: ControllerProps) {
  const { focused } = useEditorContext();
  const em = useEntityManager();
  const lightData = em.getComponent(Light, entity);
  const ref = useRef<PointLight>(null!);
  const params = lightData!.data as PointLightData;
  useHelper(focused === entity && ref, PointLightHelper, 1, 'red');

  return (
    <LightTemplate entity={entity}>
      <pointLight
        ref={ref}
        color={params.color}
        intensity={params.intensity}
        distance={params.distance}
        decay={params.decay}
        castShadow={params.castShadow}
      />
    </LightTemplate>
  );
}
