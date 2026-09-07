import { useTexture } from '@react-three/drei';
import Material from '../../../engine/components/Material';
import BasicMaterialData from '../../../engine/components/materials/BasicMaterialData';
import useDownloadFile from '../../../hooks/useDownloadFile';
import useEntityManager from '../../../hooks/useEntityManager';
import ControllerProps from '../../../types/ControllerProps';

export default function BasicMaterial({ entity }: ControllerProps) {
  const em = useEntityManager();
  const materialData = em.getComponent(Material, entity);
  let params;

  if (materialData) {
    params = materialData.data as BasicMaterialData;
  }

  const EMPTY =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==';
  const { data } = useDownloadFile(params.map);
  if (data)
    console.log(
      data.data.downloadUrl.replace('http://cadr.azurite:10000/', '/azurite'),
    );
  const texture = useTexture(
    data
      ? data.data.downloadUrl.replace('http://cadr.azurite:10000/', '/azurite')
      : EMPTY,
  );

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
        map={texture}
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
