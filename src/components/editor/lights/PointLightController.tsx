import { useRef } from 'react';
import useEntityManager from '../../../hooks/useEntityManager';
import ControllerProps from '../../../types/ControllerProps';
import PointLightData from '../../../engine/components/lights/PointLightData';
import { TransformControls, useHelper } from '@react-three/drei';
import { PointLight, PointLightHelper, TextureLoader } from 'three';
import Light from '../../../engine/components/Light';
import { useEditorContext } from '../../../hooks/useEditorContext';
import { useLoader } from '@react-three/fiber';

export default function PointLightController({ entity }: ControllerProps) {
  const colorMap = useLoader(TextureLoader, '/public/lightbulb.png');
  const { focused } = useEditorContext();
  const em = useEntityManager();
  const lightData = em.getComponent(Light, entity);
  const ref = useRef<PointLight>(null!);
  useHelper(focused && ref, PointLightHelper, 1, 'red');
  let params;

  if (lightData) {
    params = lightData.data as PointLightData;
  }

  return (
    params && (
      <TransformControls>
        <group position={[2, 2, 2]}>
          <pointLight
            ref={ref}
            color={params.color}
            intensity={params.intensity}
            distance={params.distance}
            decay={params.decay}
          />

          <sprite scale={0.5}>
            <spriteMaterial depthWrite={false} map={colorMap} transparent />
          </sprite>
        </group>
      </TransformControls>
    )
  );
}
