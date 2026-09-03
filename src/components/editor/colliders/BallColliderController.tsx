import { BallCollider } from '@react-three/rapier';
import Collider from '../../../engine/components/Collider';
import useEntityManager from '../../../hooks/useEntityManager';
import ControllerProps from '../../../types/ControllerProps';
import Transform, { addVec3 } from '../../../engine/components/Transform';
import Ball from '../../../engine/components/colliders/Ball';
import physicsHandlers from '../../../engine/handlers/Physics';

export default function BallColliderController({ entity }: ControllerProps) {
  const em = useEntityManager();
  const colliderData = em.getComponent(Collider, entity);
  const transform = em.getComponent(Transform, entity);
  let params;

  if (colliderData) {
    params = colliderData.data as Ball;
  }

  return (
    colliderData &&
    params && (
      <BallCollider
        {...physicsHandlers}
        name={entity}
        // should collider and mesh use the sasme transformation component?
        position={addVec3(transform?.position, colliderData.position)}
        rotation={addVec3(transform?.rotation, colliderData.rotation)}
        scale={addVec3(transform?.scale, colliderData.scale)}
        activeCollisionTypes={colliderData.activeCollisionTypes}
        contactSkin={colliderData.contactSkin}
        friction={colliderData.friction}
        frictionCombineRule={colliderData.frictionCombineRule}
        mass={colliderData.mass}
        restitution={colliderData.restitution}
        sensor={colliderData.sensor}
        args={[params.radius]}
      />
    )
  );
}
