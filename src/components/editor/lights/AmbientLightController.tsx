import Light from '../../../engine/components/Light';
import useEntityManager from '../../../hooks/useEntityManager';
import ControllerProps from '../../../types/ControllerProps';
import AmbienLightData from '../../../engine/components/lights/AmbientLightData';

export default function AmbientLightController({ entity }: ControllerProps) {
  const em = useEntityManager();
  const lightData = em.getComponent(Light, entity);
  let params;

  if (lightData) {
    params = lightData.data as AmbienLightData;
  }

  return (
    params && <ambientLight color={params.color} intensity={params.intensity} />
  );
}
