import { HemisphereLight, HemisphereLightHelper } from 'three';
import Light from '../../../engine/components/Light';
import useEntityManager from '../../../hooks/useEntityManager';
import ControllerProps from '../../../types/ControllerProps';
import { useRef } from 'react';
import { useHelper } from '@react-three/drei';
import HemisphereLightData from '../../../engine/components/lights/HemisphereLightData';
import { useEditorContext } from '../../../hooks/useEditorContext';

export default function HemisphereLightController({ entity }: ControllerProps) {
  const { focused } = useEditorContext();
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
      <hemisphereLight
        ref={ref}
        color={params.skyColor}
        groundColor={params.groundColor}
        intensity={params.intensity}
      />
    )
  );
}
