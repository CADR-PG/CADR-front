import { SpotLight, SpotLightHelper } from 'three';
import Light from '../../../engine/components/Light';
import useEntityManager from '../../../hooks/useEntityManager';
import ControllerProps from '../../../types/ControllerProps';
import { useRef } from 'react';
import { useHelper } from '@react-three/drei';
import SpotLightData from '../../../engine/components/lights/SpotLightData';
import { useEditorContext } from '../../../hooks/useEditorContext';
import LightTemplate from './LightTemplate';

export default function SpotLightController({ entity }: ControllerProps) {
  const { focused } = useEditorContext();
  const em = useEntityManager();
  const lightData = em.getComponent(Light, entity);
  const ref = useRef<SpotLight>(null!);
  const params = lightData!.data as SpotLightData;
  useHelper(focused === entity && ref, SpotLightHelper, 'red');

  return (
    <LightTemplate entity={entity}>
      <spotLight
        ref={ref}
        color={params.color}
        intensity={params.intensity}
        distance={params.distance}
        angle={params.distance}
        penumbra={params.penumbra}
        decay={params.decay}
        castShadow={params.castShadow}
      />
    </LightTemplate>
  );
}
