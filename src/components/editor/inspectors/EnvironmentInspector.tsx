import cEnvironment from '../../../engine/components/Environment';
import InspectorTemplate from './InspectorTemplate';
import GenericSelect from './GenericSelect';
import EnvironmentPresets from '../../../data/EnvironmentPresets';
import InspectorProps from '../../../types/InspectorProps';

export default function EnvironmentInspector({ entity }: InspectorProps) {
  return (
    <InspectorTemplate
      entity={entity}
      componentType={cEnvironment}
      specialRender={(key) => {
        switch (key) {
          case 'preset':
            return (
              <GenericSelect
                entity={entity}
                componentType={cEnvironment}
                componentKey="preset"
                options={EnvironmentPresets}
              />
            );
          case 'background':
            return (
              <GenericSelect
                entity={entity}
                componentType={cEnvironment}
                componentKey="background"
                options={{ yes: true, no: false, only: 'only' }}
              />
            );
        }
      }}
    />
  );
}
