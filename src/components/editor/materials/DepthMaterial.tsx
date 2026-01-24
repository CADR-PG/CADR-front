import Material from '../../../engine/components/Material';
import useEntityManager from '../../../hooks/useEntityManager';
import ControllerProps from '../../../types/ControllerProps';
import DepthMaterialData from '../../../engine/components/materials/DepthMaterialData';

export default function DepthMaterial({ entity }: ControllerProps) {
  const em = useEntityManager();
  const materialData = em.getComponent(Material, entity);
  let params;

  if (materialData) {
    params = materialData.data as DepthMaterialData;
  }

  return (
    params && (
      <meshDepthMaterial
        displacementBias={params.displacementBias}
        displacementScale={params.displacementScale}
        wireframe={params.wireframe}
        wireframeLinewidth={params.wireframeLinewidth}
      />
    )
  );
}
