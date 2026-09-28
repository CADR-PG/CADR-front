import { RoundCylinderCollider } from '@react-three/rapier';
import ControllerProps from '../../../types/ControllerProps';
import RoundCylinder from '../../../engine/components/colliders/RoundCylinder';
import physicsHandlers from '../../../engine/handlers/Physics';
import usePhysics from '../../../hooks/usePhysics';
import useWorldTransform from '@/hooks/useWorldTransform';

export default function RoundCylinderColliderController({
  entity,
}: ControllerProps) {
  const { params, args } = usePhysics<RoundCylinder>(entity);
  const t = useWorldTransform(entity);
  return (
    params && (
      <RoundCylinderCollider
        {...physicsHandlers}
        {...params}
        args={[args.halfHeight, args.radius, args.borderRadius]}
        key={`${args.halfHeight} ${args.radius} ${args.borderRadius} ${t?.position} ${t?.rotation} ${t?.scale}`}
      />
    )
  );
}
