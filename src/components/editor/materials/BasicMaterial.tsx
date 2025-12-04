import Material from '../../../engine/components/Material';
import BasicMaterialData from '../../../engine/components/materials/BasicMaterialData';
import useEntityManager from '../../../hooks/useEntityManager';
import ControllerProps from '../../../types/ControllerProps';

export default function BasicMaterial({ entity }: ControllerProps) {
  const em = useEntityManager();
  const materialData = em.getComponent(Material, entity);
  let params;

  if (materialData) {
    params = materialData.data as BasicMaterialData;
  }

  return (
    params && (
      <meshBasicMaterial
        // alphaMap={params.alphaMap}
        // aoMap={params.aoMap}
        aoMapIntensity={params.aoMapIntensity}
        color={params.color}
        combine={params.combine}
        // envMap={params.envMap}
        // envMapRotation={params.envMapRotation}
        fog={params.fog}
        // lightMap={params.lightMap}
        lightMapIntensity={params.lightMapIntensity}
        // map={params.map}
        reflectivity={params.reflectivity}
        refractionRatio={params.refractionRatio}
        // specularMap={params.specularMap}
        wireframe={params.wireframe}
        wireframeLinecap={params.wireframeLinecap}
        wireframeLinejoin={params.wireframeLinejoin}
        wireframeLinewidth={params.wireframeLinewidth}
      />
    )
  );
}
