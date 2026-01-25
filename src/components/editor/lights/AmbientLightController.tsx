import Light from '../../../engine/components/Light';
import useEntityManager from '../../../hooks/useEntityManager';
import ControllerProps from '../../../types/ControllerProps';
import AmbienLightData from '../../../engine/components/lights/AmbientLightData';
import { useEditorContext } from '../../../hooks/useEditorContext';
import { useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';

export default function AmbientLightController({ entity }: ControllerProps) {
  const colorMap = useLoader(TextureLoader, '/public/lightbulb.png');
  const em = useEntityManager();
  const { focus, running } = useEditorContext();
  const lightData = em.getComponent(Light, entity);
  let params;

  if (lightData) {
    params = lightData.data as AmbienLightData;
  }

  return (
    params && (
      <group>
        <ambientLight
          color={params.color}
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
