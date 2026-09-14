import { ECS } from '../../../engine/ECS';
import RBody from '../../../engine/components/RigidBody';
import useEntityManager from '../../../hooks/useEntityManager';
import Colliders from './Colliders';
import ActiveCollisionTypesInspector from './ActiveCollisionTypesInspector';
import RigidBodyType from './RigidBodyType';
import CollisionGroups from './CollisionGroups';
import InspectorTemplate from './InspectorTemplate';
import InspectorProps from '../../../types/InspectorProps';

export default function RigidBodyInspector({ entity }: InspectorProps) {
  const em = useEntityManager();
  const rigidBody = em.getComponent(RBody, entity);
  const rigidBodyWrite = ECS.instance.entityManager.getComponent(RBody, entity);

  if (!rigidBodyWrite || !rigidBody) return;

  return (
    <InspectorTemplate
      entity={entity}
      componentType={RBody}
      specialRender={(key) => {
        switch (key) {
          case 'name':
            return;
          case 'colliders':
            return <Colliders entity={entity} type={rigidBody.colliders} />;
          case 'activeCollisionTypes':
            return (
              <ActiveCollisionTypesInspector
                collisionType={rigidBody.activeCollisionTypes}
                componentWrite={rigidBodyWrite}
              />
            );
          case 'type':
            return <RigidBodyType entity={entity} type={rigidBody.type} />;
          case 'collisionGroups':
            return (
              <CollisionGroups
                groups={rigidBody.collisionGroups}
                componentWrite={rigidBodyWrite}
              />
            );
          default:
            break;
        }
      }}
    />
  );
}
