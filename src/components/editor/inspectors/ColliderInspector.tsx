import Collider from '../../../engine/components/Collider';
import { Entity } from '../../../engine/Entity';
import NumberField from '../../NumberField';
import { ECS } from '../../../engine/ECS';
import { Vec3 } from '../../../engine/components/Transform';
import CollisionGroups from './CollisionGroups';
import ActiveCollisionTypesInspector from './ActiveCollisionTypesInspector';
import InspectorTemplate from './InspectorTemplate';

interface ColliderInspectorProps {
  entity: Entity;
  data: Collider;
}

export default function ColliderInspector({
  entity,
  data,
}: ColliderInspectorProps) {
  const colliderWrite = ECS.instance.entityManager.getComponent(
    Collider,
    entity,
  );

  if (!colliderWrite) return;
  function handleTransformChange(
    value: number | null,
    key: keyof Collider,
    position: number,
  ) {
    if (!colliderWrite || value === null) return;

    (colliderWrite[key] as Vec3)[position] = value;
  }
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
          case 'position':
          case 'rotation':
          case 'scale':
            return (
              <>
                <div className="inspector-input-columns">
                  <NumberField
                    className="inspector-input-columns-column"
                    value={(data[key] as Vec3)[0]}
                    onValueChange={(value) =>
                      handleTransformChange(value, key, 0)
                    }
                    size="small"
                    label="x"
                  />
                  <NumberField
                    className="inspector-input-columns-column"
                    value={(data[key] as Vec3)[1]}
                    onValueChange={(value) =>
                      handleTransformChange(value, key, 1)
                    }
                    size="small"
                    label="y"
                  />
                  <NumberField
                    className="inspector-input-columns-column"
                    value={(data[key] as Vec3)[2]}
                    onValueChange={(value) =>
                      handleTransformChange(value, key, 2)
                    }
                    size="small"
                    label="z"
                  />
                </div>
              </>
            );
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
          default:
            return undefined;
        }
      }}
    />
  );
}
