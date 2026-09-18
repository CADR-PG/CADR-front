import Collider from '../../../engine/components/Collider';
import CollisionGroups from './CollisionGroups';
import ActiveCollisionTypesInspector from './ActiveCollisionTypesInspector';
import InspectorTemplate from './InspectorTemplate';
import InspectorProps from '../../../types/InspectorProps';
import GenericSelect from './GenericSelect';

export default function ColliderInspector({ entity }: InspectorProps) {
  return (
    <InspectorTemplate
      entity={entity}
      componentType={Collider}
      specialRender={(key) => {
        switch (key) {
          case 'name':
            return;
          case 'element':
            return;
          case 'data':
            return;
          case 'collisionGroups':
            return <CollisionGroups entity={entity} component={Collider} />;
          case 'activeCollisionTypes':
            return (
              <ActiveCollisionTypesInspector
                entity={entity}
                componentType={Collider}
              />
            );
          case 'frictionCombineRule':
            return (
              <GenericSelect
                entity={entity}
                componentType={Collider}
                componentKey={key}
                options={{ Average: 0, Min: 1, Multiply: 2, Max: 3 }}
              />
            );
          default:
            return undefined;
        }
      }}
    />
  );
}
