import Material from '../../../engine/components/Material';
import StandardMaterialData from '../../../engine/components/materials/StandardMaterialData';
import useEntityManager from '../../../hooks/useEntityManager';
import ControllerProps from '../../../types/ControllerProps';

export default function StandardMaterial({ entity }: ControllerProps) {
  const em = useEntityManager();
  const materialData = em.getComponent(Material, entity);
  let params;

  if (materialData) {
    params = materialData.data as StandardMaterialData;
  }

  return (
    params && (
      <meshStandardMaterial
        color={params.color}
        metalness={params.metalness}
        roughness={params.roughness}
        envMapIntensity={params.envMapIntensity}
        aoMapIntensity={params.aoMapIntensity}
        lightMapIntensity={params.lightMapIntensity}
        bumpScale={params.bumpScale}
        normalScale={params.normalScale as any}
        displacementScale={params.displacementScale}
        displacementBias={params.displacementBias}
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
