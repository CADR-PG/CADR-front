import { RoundCylinderCollider } from '@react-three/rapier';
import ControllerProps from '../../../types/ControllerProps';
import RoundCylinder from '../../../engine/components/colliders/RoundCylinder';
import physicsHandlers from '../../../engine/handlers/Physics';
import usePhysics from '../../../hooks/usePhysics';

export default function RoundCylinderColliderController({
  entity,
}: ControllerProps) {
  const { params, args } = usePhysics<RoundCylinder>(entity);
  return (
    params && (
      <RoundCylinderCollider
        {...physicsHandlers}
        {...params}
        args={[args.halfHeight, args.radius, args.borderRadius]}
      />
    )
  );
}
