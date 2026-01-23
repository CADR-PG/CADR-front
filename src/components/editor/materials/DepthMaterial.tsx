import Material from '../../../engine/components/Material';
import useEntityManager from '../../../hooks/useEntityManager';
import ControllerProps from '../../../types/ControllerProps';

interface DepthMaterialData {
  displacementScale?: number;
  displacementBias?: number;
  fog?: boolean;
  wireframe?: boolean;
  wireframeLinecap?: string;
  wireframeLinejoin?: string;
  wireframeLinewidth?: number;
}

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
