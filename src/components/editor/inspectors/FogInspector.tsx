import Fog, { FogData } from '../../../engine/components/Fog';
import ColorPicker from './ColorPicker';
import InspectorTemplate from './InspectorTemplate';
import InspectorProps from '../../../types/InspectorProps';

export default function FogInspector({ entity }: InspectorProps) {
  return (
    <InspectorTemplate
      entity={entity}
      componentType={Fog}
      skipKeys={[]}
      select={(c) => c.data}
      specialRender={(key) => {
        switch (key) {
          case 'color':
            return (
              <ColorPicker<FogData, Fog>
                entity={entity}
                component={Fog}
                field="color"
              />
            );
        }
      }}
    />
  );
}
