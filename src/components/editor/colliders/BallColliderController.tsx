import { BallCollider } from '@react-three/rapier';
import ControllerProps from '../../../types/ControllerProps';
import Ball from '../../../engine/components/colliders/Ball';
import physicsHandlers from '../../../engine/handlers/Physics';
import usePhysics from '../../../hooks/usePhysics';
import useWorldTransform from '@/hooks/useWorldTransform';

export default function BallColliderController({ entity }: ControllerProps) {
  const { params, args } = usePhysics<Ball>(entity);
  const t = useWorldTransform(entity);
  return (
    params && (
      <BallCollider
        {...physicsHandlers}
        {...params}
        args={[args.radius]}
        key={`${args.radius} ${t?.position} ${t?.rotation} ${t?.scale}`}
      />
    )
  );
}
