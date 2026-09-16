import { CapsuleCollider } from '@react-three/rapier';
import ControllerProps from '../../../types/ControllerProps';
import Capsule from '../../../engine/components/colliders/Capsule';
import physicsHandlers from '../../../engine/handlers/Physics';
import usePhysics from '../../../hooks/usePhysics';

export default function CapsuleColliderController({ entity }: ControllerProps) {
  const { params, args } = usePhysics<Capsule>(entity);
  return (
    params && (
      <CapsuleCollider
        {...physicsHandlers}
        {...params}
        args={[args.halfHeight, args.radius]}
        key={`${args.halfHeight} ${args.radius}`}
      />
    )
  );
}
