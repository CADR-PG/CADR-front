import { CylinderCollider } from '@react-three/rapier';
import Collider from '../../../engine/components/Collider';
import useEntityManager from '../../../hooks/useEntityManager';
import ControllerProps from '../../../types/ControllerProps';
import Cylinder from '../../../engine/components/colliders/Cylinder';
import physicsHandlers from '../../../engine/handlers/Physics';

export default function CylinderColliderController({
  entity,
}: ControllerProps) {
  const em = useEntityManager();
  const colliderData = em.getComponent(Collider, entity);
  let params;

  if (colliderData) {
    params = colliderData.data as Cylinder;
  }

  return (
    colliderData &&
    params && (
      <CylinderCollider
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
        args={[params.halfHeight, params.radius]}
      />
    )
  );
}
