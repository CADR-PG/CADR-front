import Material from '../../../engine/components/Material';
import ToonMaterialData from '../../../engine/components/materials/ToonMaterialData';
import useEntityManager from '../../../hooks/useEntityManager';
import ControllerProps from '../../../types/ControllerProps';

export default function ToonMaterial({ entity }: ControllerProps) {
  const em = useEntityManager();
  const materialData = em.getComponent(Material, entity);
  let params;

  if (materialData) {
    params = materialData.data as ToonMaterialData;
  }

  return (
    params && (
      <meshToonMaterial
        color={params.color}
        emissive={params.emissive}
        emissiveIntensity={params.emissiveIntensity}
        opacity={params.opacity}
        transparent={params.transparent}
        fog={params.fog}
        wireframe={params.wireframe}
        wireframeLinecap={params.wireframeLinecap}
        wireframeLinejoin={params.wireframeLinejoin}
        wireframeLinewidth={params.wireframeLinewidth}
      />
    )
  );
}
