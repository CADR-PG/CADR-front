import Light from '../../../engine/components/Light';
import useEntityManager from '../../../hooks/useEntityManager';
import ControllerProps from '../../../types/ControllerProps';
import RectAreaLightData from '../../../engine/components/lights/RectAreaLightData';
import { useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';
import { useEditorContext } from '../../../hooks/useEditorContext';

export default function RectAreaLightController({ entity }: ControllerProps) {
  const colorMap = useLoader(TextureLoader, '/public/lightbulb.png');
  const { focus, running } = useEditorContext();
  const em = useEntityManager();
  const lightData = em.getComponent(Light, entity);
  let params;

  if (lightData) {
    params = lightData.data as RectAreaLightData;
  }

  return (
    params && (
      <group>
        <rectAreaLight
          color={params.color}
          intensity={params.intensity}
          width={params.width}
          height={params.height}
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
