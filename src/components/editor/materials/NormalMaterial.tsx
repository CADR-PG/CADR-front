import Material from '../../../engine/components/Material';
import NormalMaterialData from '../../../engine/components/materials/NormalMaterialData';
import useEntityManager from '../../../hooks/useEntityManager';
import ControllerProps from '../../../types/ControllerProps';

export default function NormalMaterial({ entity }: ControllerProps) {
  const em = useEntityManager();
  const materialData = em.getComponent(Material, entity);
  let params;

  if (materialData) {
    params = materialData.data as NormalMaterialData;
  }

  return (
    params && (
      <meshNormalMaterial
        flatShading={params.flatShading}
        wireframe={params.wireframe}
      />
    )
  );
}
