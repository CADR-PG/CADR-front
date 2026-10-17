import Light from '../../../engine/components/Light';
import useEntityManager from '../../../hooks/useEntityManager';
import ControllerProps from '../../../types/ControllerProps';
import AmbientLightData from '../../../engine/components/lights/AmbientLightData';
import LightTemplate from './LightTemplate';

export default function AmbientLightController({ entity }: ControllerProps) {
  const em = useEntityManager();
  const lightData = em.getComponent(Light, entity);
  const params = lightData!.data as AmbientLightData;

  return (
    <LightTemplate entity={entity}>
      <ambientLight
        color={params.color}
        intensity={params.intensity}
        castShadow={params.castShadow}
      />
    </LightTemplate>
  );
}
