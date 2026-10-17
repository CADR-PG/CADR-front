import Material from '../../../engine/components/Material';
import LambertMaterialData from '../../../engine/components/materials/LambertMaterialData';
import useEntityManager from '../../../hooks/useEntityManager';
import ControllerProps from '../../../types/ControllerProps';

export default function LambertMaterial({ entity }: ControllerProps) {
  const em = useEntityManager();
  const materialData = em.getComponent(Material, entity);
  let params;

  if (materialData) {
    params = materialData.data as LambertMaterialData;
  }

  return (
    params && (
      <meshLambertMaterial
        aoMapIntensity={params.aoMapIntensity}
        color={params.color}
        emissive={params.emissive}
        emissiveIntensity={params.emissiveIntensity}
        fog={params.fog}
        lightMapIntensity={params.lightMapIntensity}
        wireframe={params.wireframe}
        wireframeLinecap={params.wireframeLinecap}
        wireframeLinejoin={params.wireframeLinejoin}
        wireframeLinewidth={params.wireframeLinewidth}
      />
    )
  );
}
