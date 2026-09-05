import { CuboidCollider } from '@react-three/rapier';
import Collider from '../../../engine/components/Collider';
import Cuboid from '../../../engine/components/colliders/Cuboid';
import useEntityManager from '../../../hooks/useEntityManager';
import ControllerProps from '../../../types/ControllerProps';
import physicsHandlers from '../../../engine/handlers/Physics';
import ColliderControllerProps from '../../../types/ColliderControllerProps';

export default function CuboidColliderController({
  entity,
}: ControllerProps & ColliderControllerProps) {
  const em = useEntityManager();
  const colliderData = em.getComponent(Collider, entity);
  let params;

  if (colliderData) {
    params = colliderData.data as Cuboid;
  }

  return (
    colliderData &&
    params && (
      <CuboidCollider
        {...physicsHandlers}
        name={entity}
        // should collider and mesh use the sasme transformation component?
        position={colliderData.position}
        rotation={colliderData.rotation}
        scale={colliderData.scale}
        activeCollisionTypes={colliderData.activeCollisionTypes}
        // collisionGroups={interactionGroups([], [])}
        contactSkin={colliderData.contactSkin}
        // density={colliderData.density}
        friction={colliderData.friction}
        frictionCombineRule={colliderData.frictionCombineRule}
        mass={colliderData.mass}
        restitution={colliderData.restitution}
        sensor={colliderData.sensor}
        args={[params.halfWidth, params.halfHeight, params.halfDepth]}
      />
    )
  );
}
