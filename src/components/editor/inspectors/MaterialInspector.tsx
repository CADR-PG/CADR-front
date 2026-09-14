import Material, { MaterialData } from '../../../engine/components/Material';
import { Entity } from '../../../engine/Entity';
import { ECS } from '../../../engine/ECS';
import ColorPicker from './ColorPicker';
import EnvMapRotation from './EnvMapRotation';
import Wireframe from './Wireframe';
import MaterialType from './MaterialType';
import WireframeType from '../../../types/WireframeType';
import Combine from './Combine';
import { Combine as CombineType } from 'three';
import MapDropArea from './MapDropArea';
import InspectorTemplate from './InspectorTemplate';

interface MaterialInspectorProps<T extends MaterialData> {
  entity: Entity;
  data: T;
}

export default function MaterialInspector<T extends MaterialData>({
  entity,
  data,
}: MaterialInspectorProps<T>) {
  const materialWrite = ECS.instance.entityManager.getComponent(
    Material,
    entity,
  );

  if (!materialWrite) return;
  return (
    <InspectorTemplate
      entity={entity}
      componentType={Material}
      select={(c) => c.data as T}
      specialRender={(key) => {
        switch (key) {
          case 'type':
            return <MaterialType entity={entity} type={data.type} />;
          case 'combine':
            return <Combine entity={entity} value={data[key] as CombineType} />;
          case 'color':
            return (
              materialWrite && (
                <ColorPicker
                  componentColor={'color' in data ? (data.color as number) : 0}
                  data={materialWrite.data}
                  field={key as keyof typeof materialWrite.data}
                />
              )
            );
          case 'envMapRotation':
            return (
              <EnvMapRotation
                entity={entity}
                envMapRotation={
                  'envMapRotation' in data
                    ? (data.envMapRotation as [number, number, number])
                    : [0, 0, 0]
                }
              />
            );
          case 'wireframeLinecap':
          case 'wireframeLinejoin':
            return (
              <Wireframe
                entity={entity}
                wireframe={data[key] as WireframeType}
                wireframeKey={key}
              />
            );
          case 'alphaMap':
          case 'aoMap':
          case 'envMap':
          case 'lightMap':
          case 'specularMap':
          case 'map':
          case 'displacementMap':
          case 'bumpMap':
          case 'metalnessMap':
          case 'normalMap':
          case 'emissiveMap':
          case 'roughnessMap':
          case 'gradientMap':
          case 'anisotropyMap':
          case 'clearcoatMap':
          case 'clearcoatRoughnessMap':
          case 'iridescenceMap':
          case 'iridescenceThicknessMap':
          case 'sheenColorMap':
          case 'sheenRoughnessMap':
          case 'specularColorMap':
          case 'thicknessMap':
          case 'transmissionMap':
            return (
              <MapDropArea
                entity={entity}
                componentWrite={materialWrite.data}
                mapType={key}
              />
            );
          default:
            return undefined;
        }
      }}
    />
  );
}
