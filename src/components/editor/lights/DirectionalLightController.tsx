import { useRef } from 'react';
import Light from '../../../engine/components/Light';
import DirectionalLightData from '../../../engine/components/lights/DirectionalLightData';
import useEntityManager from '../../../hooks/useEntityManager';
import ControllerProps from '../../../types/ControllerProps';
import { DirectionalLight, DirectionalLightHelper } from 'three';
import { useHelper } from '@react-three/drei';
import { useEditorContext } from '../../../hooks/useEditorContext';
import LightTemplate from './LightTemplate';

export default function DirectionalLightController({
  entity,
}: ControllerProps) {
  const { focused } = useEditorContext();
  const em = useEntityManager();
  const lightData = em.getComponent(Light, entity);
  const ref = useRef<DirectionalLight>(null!);
  const params = lightData!.data as DirectionalLightData;
  useHelper(focused === entity && ref, DirectionalLightHelper, 1, 'red');

  return (
    <LightTemplate entity={entity}>
      <directionalLight
        ref={ref}
        color={params.color}
        intensity={params.intensity}
        castShadow={params.castShadow}
      />
    </LightTemplate>
  );
}
