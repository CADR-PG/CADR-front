import { RoundCuboidCollider } from '@react-three/rapier';
import ControllerProps from '../../../types/ControllerProps';
import RoundCuboid from '../../../engine/components/colliders/RoundCuboid';
import physicsHandlers from '../../../engine/handlers/Physics';
import usePhysics from '../../../hooks/usePhysics';

export default function RoundCuboidColliderController({
  entity,
}: ControllerProps) {
  const { params, args } = usePhysics<RoundCuboid>(entity);
  return (
    params && (
      <RoundCuboidCollider
        {...physicsHandlers}
        {...params}
        args={[
          args.halfWidth,
          args.halfHeight,
          args.halfDepth,
          args.borderRadius,
        ]}
        key={`${args.halfWidth} ${args.halfHeight} ${args.halfDepth} ${args.borderRadius}`}
      />
    )
  );
}
