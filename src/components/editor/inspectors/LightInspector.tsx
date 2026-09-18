import Light, { LightData } from '../../../engine/components/Light';
import ColorPicker from './ColorPicker';
import InspectorTemplate from './InspectorTemplate';
import GenericFactory from './GenericFactory';
import Lights from '../../../data/LightNames';
import InspectorProps from '../../../types/InspectorProps';

export default function LightInspector<T extends LightData>({
  entity,
}: InspectorProps) {
  return (
    <InspectorTemplate
      entity={entity}
      componentType={Light}
      skipKeys={[]}
      select={(c) => c.data as T}
      specialRender={(key) => {
        switch (key) {
          case 'type':
            return (
              <GenericFactory entity={entity} component={Light} data={Lights} />
            );
          case 'color':
          case 'groundColor':
          case 'skyColor':
            return (
              <ColorPicker
                entity={entity}
                component={Light}
                field={key as keyof LightData}
              />
            );
        }
      }}
    />
  );
}
