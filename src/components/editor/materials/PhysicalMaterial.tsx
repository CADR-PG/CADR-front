import ControllerProps from '../../../types/ControllerProps';
import Material from '../../../engine/components/Material';
import PhysicalMaterialData from '../../../engine/components/materials/PhysicalMaterialData';
import useEntityManager from '../../../hooks/useEntityManager';

export default function PhysicalMaterial({ entity }: ControllerProps) {
  const em = useEntityManager();
  const materialData = em.getComponent(Material, entity);
  let params;

  if (materialData) {
    params = materialData.data as PhysicalMaterialData;
  }

  return (
    params && (
      <meshPhysicalMaterial
        aoMapIntensity={params.aoMapIntensity}
        clearcoat={params.clearcoat}
        clearcoatRoughness={params.clearcoatRoughness}
        color={params.color}
        emissive={params.emissive}
        emissiveIntensity={params.emissiveIntensity}
        envMapIntensity={params.envMapIntensity}
        fog={params.fog}
        ior={params.ior}
        lightMapIntensity={params.lightMapIntensity}
        metalness={params.metalness}
        opacity={params.opacity}
        reflectivity={params.reflectivity}
        roughness={params.roughness}
        sheen={params.sheen}
        thickness={params.thickness}
        transmission={params.transmission}
        transparent={params.transparent}
        wireframe={params.wireframe}
        wireframeLinecap={params.wireframeLinecap}
        wireframeLinejoin={params.wireframeLinejoin}
        wireframeLinewidth={params.wireframeLinewidth}
      />
    )
  );
}
