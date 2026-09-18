import ControllerProps from '../../../types/ControllerProps';
import Cone from '../../../engine/components/colliders/Cone';
import { ConeCollider } from '@react-three/rapier';
import physicsHandlers from '../../../engine/handlers/Physics';
import usePhysics from '../../../hooks/usePhysics';

export default function ConeColliderController({ entity }: ControllerProps) {
  const { params, args } = usePhysics<Cone>(entity);
  return (
    params && (
      <ConeCollider
        {...physicsHandlers}
        {...params}
        args={[args.halfHeight, args.radius]}
        key={`${args.halfHeight} ${args.radius}`}
      />
    )
  );
}
