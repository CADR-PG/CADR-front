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
        // W/A because it seems that rapier doesn't request a new frame
        // on prop changes. Might change that later idk
        key={`${args.halfWidth} ${args.halfHeight} ${args.halfDepth}`}
      />
    )
  );
}
