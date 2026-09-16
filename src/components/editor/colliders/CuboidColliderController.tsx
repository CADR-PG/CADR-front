import { CuboidCollider } from '@react-three/rapier';
import Cuboid from '../../../engine/components/colliders/Cuboid';
import ControllerProps from '../../../types/ControllerProps';
import physicsHandlers from '../../../engine/handlers/Physics';
import usePhysics from '../../../hooks/usePhysics';

export default function CuboidColliderController({ entity }: ControllerProps) {
  const { params, args } = usePhysics<Cuboid>(entity);
  return (
    params && (
      <CuboidCollider
        {...physicsHandlers}
        {...params}
        args={[args.halfWidth, args.halfHeight, args.halfDepth]}
      />
    )
  );
}
