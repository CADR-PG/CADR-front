import Material from '../../../engine/components/Material';
import PhongMaterialData from '../../../engine/components/materials/PhongMaterialData';
import useEntityManager from '../../../hooks/useEntityManager';
import ControllerProps from '../../../types/ControllerProps';

export default function PhongMaterial({ entity }: ControllerProps) {
  const em = useEntityManager();
  const materialData = em.getComponent(Material, entity);
  let params;

  if (materialData) {
    params = materialData.data as PhongMaterialData;
  }

  return (
    params && (
      <meshPhongMaterial
        aoMapIntensity={params.aoMapIntensity}
        color={params.color}
        fog={params.fog}
        lightMapIntensity={params.lightMapIntensity}
        shininess={params.shininess}
        specular={params.specular}
        emissive={params.emissive}
        emissiveIntensity={params.emissiveIntensity}
        reflectivity={params.reflectivity}
        refractionRatio={params.refractionRatio}
        wireframe={params.wireframe}
        wireframeLinecap={params.wireframeLinecap}
        wireframeLinejoin={params.wireframeLinejoin}
        wireframeLinewidth={params.wireframeLinewidth}
      />
    )
  );
}
