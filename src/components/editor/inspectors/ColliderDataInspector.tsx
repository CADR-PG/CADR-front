import Collider, { ColliderData } from '../../../engine/components/Collider';
import { Entity } from '../../../engine/Entity';
import ColliderTypeInspector from './ColliderTypeInspector';
import InspectorTemplate from './InspectorTemplate';

interface ColliderDataInspectorProps<T extends ColliderData> {
  entity: Entity;
  data: T;
}

export default function ColliderDataInspector<T extends ColliderData>({
  entity,
  data,
}: ColliderDataInspectorProps<T>) {
  return (
    <InspectorTemplate
      entity={entity}
      componentType={Collider}
      select={(c) => c.data}
      skipKeys={[]}
      specialRender={(key) => {
        switch (key) {
          case 'type':
            return <ColliderTypeInspector entity={entity} type={data.type} />;
          default:
            break;
        }
      }}
    />
  );
}
