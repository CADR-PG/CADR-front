import Collider from '../../../engine/components/Collider';
import { ECS } from '../../../engine/ECS';
import CollisionGroups from './CollisionGroups';
import ActiveCollisionTypesInspector from './ActiveCollisionTypesInspector';
import InspectorTemplate from './InspectorTemplate';
import InspectorProps from '../../../types/InspectorProps';
import GenericSelect from './GenericSelect';

export default function ColliderInspector({ entity }: InspectorProps) {
  const colliderWrite = ECS.instance.entityManager.getComponent(
    Collider,
    entity,
  );

  if (!colliderWrite) return;

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
            return (
              <CollisionGroups
                groups={colliderWrite.collisionGroups}
                componentWrite={colliderWrite}
              />
            );
          case 'activeCollisionTypes':
            return (
              <ActiveCollisionTypesInspector
                collisionType={colliderWrite.activeCollisionTypes}
                componentWrite={colliderWrite}
              />
            );
          case 'frictionCombineRule':
            return (
              <GenericSelect
                entity={entity}
                componentType={Collider}
                componentKey={key}
                value={}
              />
            );
          default:
            return undefined;
        }
      }}
    />
  );
}
