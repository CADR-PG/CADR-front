import { useTexture } from '@react-three/drei';
import Material from '../../../engine/components/Material';
import BasicMaterialData from '../../../engine/components/materials/BasicMaterialData';
import useEntityManager from '../../../hooks/useEntityManager';
import ControllerProps from '../../../types/ControllerProps';
import { normalizeUrl } from '../../../engine/components/helpers/material';
import useDownloadTextures from '../../../hooks/useDownloadTextures';

export default function BasicMaterial({ entity }: ControllerProps) {
  const em = useEntityManager();
  const materialData = em.getComponent(Material, entity);
  let params;

  if (materialData) {
    params = materialData.data as BasicMaterialData;
  }

  const { alphaMap, aoMap, envMap, lightMap, specularMap, map } =
    useDownloadTextures(params);

  const [tAlphaMap, tAoMap, tEnvMap, tLightMap, tSpecularMap, tMap] =
    useTexture([
      normalizeUrl(alphaMap),
      normalizeUrl(aoMap),
      normalizeUrl(envMap),
      normalizeUrl(lightMap),
      normalizeUrl(specularMap),
      normalizeUrl(map),
    ]);

  return (
    params && (
      <meshBasicMaterial
        alphaMap={alphaMap ? tAlphaMap : null}
        aoMap={aoMap ? tAoMap : null}
        aoMapIntensity={params.aoMapIntensity}
        color={params.color}
        combine={params.combine}
        envMap={envMap ? tEnvMap : null}
        // envMapRotation={params.envMapRotation}
        fog={params.fog}
        lightMap={lightMap ? tLightMap : null}
        lightMapIntensity={params.lightMapIntensity}
        map={tMap}
        reflectivity={params.reflectivity}
        refractionRatio={params.refractionRatio}
        specularMap={specularMap ? tSpecularMap : null}
        wireframe={params.wireframe}
        wireframeLinecap={params.wireframeLinecap}
        wireframeLinejoin={params.wireframeLinejoin}
        wireframeLinewidth={params.wireframeLinewidth}
        key={params.map}
      />
    )
  );
}
