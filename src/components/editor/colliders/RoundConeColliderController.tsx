import { RoundConeCollider } from '@react-three/rapier';
import Collider from '../../../engine/components/Collider';
import useEntityManager from '../../../hooks/useEntityManager';
import ControllerProps from '../../../types/ControllerProps';
import RoundCone from '../../../engine/components/colliders/RoundCone';
import physicsHandlers from '../../../engine/handlers/Physics';

export default function RoundConeColliderController({
  entity,
}: ControllerProps) {
  const em = useEntityManager();
  const colliderData = em.getComponent(Collider, entity);
  let params;

  if (colliderData) {
    params = colliderData.data as RoundCone;
  }

  return (
    colliderData &&
    params && (
      <RoundConeCollider
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
        args={[params.halfHeight, params.radius, params.borderRadius]}
      />
    )
  );
}
