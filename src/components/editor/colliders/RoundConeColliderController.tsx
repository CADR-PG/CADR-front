import { RoundConeCollider } from '@react-three/rapier';
import ControllerProps from '../../../types/ControllerProps';
import RoundCone from '../../../engine/components/colliders/RoundCone';
import physicsHandlers from '../../../engine/handlers/Physics';
import usePhysics from '../../../hooks/usePhysics';
import useWorldTransform from '@/hooks/useWorldTransform';

export default function RoundConeColliderController({
  entity,
}: ControllerProps) {
  const { params, args } = usePhysics<RoundCone>(entity);
  const t = useWorldTransform(entity);
  return (
    params && (
      <RoundConeCollider
        {...physicsHandlers}
        {...params}
        args={[args.halfHeight, args.radius, args.borderRadius]}
        key={`${args.halfHeight} ${args.radius} ${args.borderRadius} ${t?.position} ${t?.rotation} ${t?.scale}`}
      />
    )
  );
}
