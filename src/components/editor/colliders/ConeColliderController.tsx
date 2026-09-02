import Collider from '../../../engine/components/Collider';
import useEntityManager from '../../../hooks/useEntityManager';
import ControllerProps from '../../../types/ControllerProps';
import Transform from '../../../engine/components/Transform';
import Cone from '../../../engine/components/colliders/Cone';
import { ConeCollider } from '@react-three/rapier';

export default function ConeColliderController({ entity }: ControllerProps) {
  const em = useEntityManager();
  const colliderData = em.getComponent(Collider, entity);
  const transform = em.getComponent(Transform, entity);
  let params;

  if (colliderData) {
    params = colliderData.data as Cone;
  }

  return (
    colliderData &&
    params && (
      <ConeCollider
        // should collider and mesh use the sasme transformation component?
        position={transform?.position}
        rotation={transform?.rotation}
        scale={transform?.scale}
        activeCollisionTypes={colliderData.activeCollisionTypes}
        contactSkin={colliderData.contactSkin}
        friction={colliderData.friction}
        frictionCombineRule={colliderData.frictionCombineRule}
        mass={colliderData.mass}
        restitution={colliderData.restitution}
        sensor={colliderData.sensor}
        args={[params.halfHeight, params.radius]}
      />
    )
  );
}
