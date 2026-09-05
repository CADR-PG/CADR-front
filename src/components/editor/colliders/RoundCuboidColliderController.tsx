import { RoundCuboidCollider } from '@react-three/rapier';
import Collider from '../../../engine/components/Collider';
import useEntityManager from '../../../hooks/useEntityManager';
import ControllerProps from '../../../types/ControllerProps';
import RoundCuboid from '../../../engine/components/colliders/RoundCuboid';
import physicsHandlers from '../../../engine/handlers/Physics';

export default function RoundCuboidColliderController({
  entity,
}: ControllerProps) {
  const em = useEntityManager();
  const colliderData = em.getComponent(Collider, entity);
  let params;

  if (colliderData) {
    params = colliderData.data as RoundCuboid;
  }

  return (
    colliderData &&
    params && (
      <RoundCuboidCollider
        {...physicsHandlers}
        name={entity}
        // should collider and mesh use the sasme transformation component?
        position={colliderData.position}
        rotation={colliderData.rotation}
        scale={colliderData.scale}
        activeCollisionTypes={colliderData.activeCollisionTypes}
        contactSkin={colliderData.contactSkin}
        friction={colliderData.friction}
        frictionCombineRule={colliderData.frictionCombineRule}
        mass={colliderData.mass}
        restitution={colliderData.restitution}
        sensor={colliderData.sensor}
        args={[
          params.halfWidth,
          params.halfHeight,
          params.halfDepth,
          params.borderRadius,
        ]}
      />
    )
  );
}
