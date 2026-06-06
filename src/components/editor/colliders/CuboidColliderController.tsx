import { CuboidCollider } from '@react-three/rapier';
import Collider from '../../../engine/components/Collider';
import Cuboid from '../../../engine/components/colliders/CuboidCollider';
import useEntityManager from '../../../hooks/useEntityManager';
import ControllerProps from '../../../types/ControllerProps';
import Transform from '../../../engine/components/Transform';

export default function CuboidColliderController({ entity }: ControllerProps) {
  const em = useEntityManager();
  const colliderData = em.getComponent(Collider, entity);
  const transform = em.getComponent(Transform, entity);
  let params;

  if (colliderData) {
    params = colliderData.data as Cuboid;
  }

  return (
    colliderData &&
    params && (
      <CuboidCollider
        // should collider and mesh use the sasme transformation component?
        position={transform?.position}
        rotation={transform?.rotation}
        scale={transform?.scale}
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
