import Light from '../../../engine/components/Light';
import useEntityManager from '../../../hooks/useEntityManager';
import ControllerProps from '../../../types/ControllerProps';
import RectAreaLightData from '../../../engine/components/lights/RectAreaLightData';

export default function RectAreaLightController({ entity }: ControllerProps) {
  const em = useEntityManager();
  const lightData = em.getComponent(Light, entity);
  let params;

  if (lightData) {
    params = lightData.data as RectAreaLightData;
  }

  return (
    params && (
      <rectAreaLight
        color={params.color}
        intensity={params.intensity}
        width={params.width}
        height={params.height}
      />
    )
  );
}
