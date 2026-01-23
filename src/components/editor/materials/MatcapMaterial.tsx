import Material from '../../../engine/components/Material';
import MatcapMaterialData from '../../../engine/components/materials/MatcapMaterialData';
import useEntityManager from '../../../hooks/useEntityManager';
import ControllerProps from '../../../types/ControllerProps';

export default function MatcapMaterial({ entity }: ControllerProps) {
  const em = useEntityManager();
  const materialData = em.getComponent(Material, entity);
  let params;

  if (materialData) {
    params = materialData.data as MatcapMaterialData;
  }

  return (
    params && (
      <meshMatcapMaterial
        color={params.color}
        fog={params.fog}
      />
    )
  );
}
