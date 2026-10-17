import Light from '../../../engine/components/Light';
import useEntityManager from '../../../hooks/useEntityManager';
import ControllerProps from '../../../types/ControllerProps';
import RectAreaLightData from '../../../engine/components/lights/RectAreaLightData';
import LightTemplate from './LightTemplate';

export default function RectAreaLightController({ entity }: ControllerProps) {
  const em = useEntityManager();
  const lightData = em.getComponent(Light, entity);
  const params = lightData!.data as RectAreaLightData;

  return (
    <LightTemplate entity={entity}>
      <rectAreaLight
        color={params.color}
        intensity={params.intensity}
        width={params.width}
        height={params.height}
        castShadow={params.castShadow}
      />
    </LightTemplate>
  );
}
