import Material, { MaterialData } from '../../../engine/components/Material';
import { ECS } from '../../../engine/ECS';
import ColorPicker from './ColorPicker';
import MapDropArea from './MapDropArea';
import InspectorTemplate from './InspectorTemplate';
import GenericSelect from './GenericSelect';
import GenericFactory from './GenericFactory';
import Materials from '../../../data/MaterialNames';
import InspectorProps from '../../../types/InspectorProps';

export default function MaterialInspector<T extends MaterialData>({
  entity,
}: InspectorProps) {
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
            return (
              <GenericFactory
                entity={entity}
                component={Material}
                data={Materials}
              />
            );
          case 'combine':
            return (
              <GenericSelect
                entity={entity}
                componentType={Material}
                componentKey={key}
                select={(c) => c.data as T}
                options={{
                  Multiply_operation: 0,
                  Mix_operation: 1,
                  Add_operation: 2,
                }}
              />
            );
          case 'color':
            return (
              <ColorPicker
                entity={entity}
                component={Material}
                field={key as keyof MaterialData}
              />
            );
          case 'wireframeLinecap':
          case 'wireframeLinejoin':
            return (
              <GenericSelect
                entity={entity}
                componentType={Material}
                componentKey={key}
                select={(c) => c.data as T}
                options={{ Round: 'round', Bevel: 'bevel', Miter: 'miter' }}
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
                componentWrite={materialWrite.data as T}
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
