import RBody from '../../../engine/components/RigidBody';
import ActiveCollisionTypesInspector from './ActiveCollisionTypesInspector';
import CollisionGroups from './CollisionGroups';
import InspectorTemplate from './InspectorTemplate';
import InspectorProps from '../../../types/InspectorProps';
import GenericSelect from './GenericSelect';

export default function RigidBodyInspector({ entity }: InspectorProps) {
  return (
    <InspectorTemplate
      entity={entity}
      componentType={RBody}
      specialRender={(key) => {
        switch (key) {
          case 'name':
            return;
          case 'colliders':
            return (
              <GenericSelect
                entity={entity}
                componentType={RBody}
                componentKey={key}
                options={{
                  Disabled: false,
                  Automatic: undefined,
                  Ball: 'ball',
                  Cuboid: 'cuboid',
                  Hull: 'hull',
                  Trimesh: 'trimesh',
                }}
              />
            );
          case 'activeCollisionTypes':
            return (
              <ActiveCollisionTypesInspector
                entity={entity}
                componentType={RBody}
              />
            );
          case 'type':
            return (
              <GenericSelect
                entity={entity}
                componentType={RBody}
                componentKey={key}
                options={{
                  Fixed: 'fixed',
                  Dynamic: 'dynamic',
                  Kinematic_position: 'kinematicPosition',
                  Kinematic_velocity: 'kinematicVelocity',
                }}
              />
            );
          case 'collisionGroups':
            return <CollisionGroups entity={entity} component={RBody} />;
          default:
            break;
        }
      }}
    />
  );
}
