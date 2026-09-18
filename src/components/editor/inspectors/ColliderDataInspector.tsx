import Colliders from '../../../data/ColliderNames';
import Collider from '../../../engine/components/Collider';
import InspectorProps from '../../../types/InspectorProps';
import GenericFactory from './GenericFactory';
import InspectorTemplate from './InspectorTemplate';

export default function ColliderDataInspector({ entity }: InspectorProps) {
  return (
    <InspectorTemplate
      entity={entity}
      componentType={Collider}
      select={(c) => c.data}
      skipKeys={[]}
      specialRender={(key) => {
        switch (key) {
          case 'type':
            return (
              <GenericFactory
                entity={entity}
                component={Collider}
                data={Colliders}
              />
            );
          default:
            break;
        }
      }}
    />
  );
}
