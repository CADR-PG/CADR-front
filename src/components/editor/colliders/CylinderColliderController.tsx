import { CylinderCollider } from '@react-three/rapier';
import Collider from '../../../engine/components/Collider';
import useEntityManager from '../../../hooks/useEntityManager';
import ControllerProps from '../../../types/ControllerProps';
import Transform, { addVec3 } from '../../../engine/components/Transform';
import Cylinder from '../../../engine/components/colliders/Cylinder';

export default function CylinderColliderController({
  entity,
}: ControllerProps) {
  const em = useEntityManager();
  const colliderData = em.getComponent(Collider, entity);
  const transform = em.getComponent(Transform, entity);
  let params;

  if (colliderData) {
    params = colliderData.data as Cylinder;
  }

  return (
    colliderData &&
    params && (
      <CylinderCollider
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
        args={[params.halfHeight, params.radius]}
      />
    )
  );
}
