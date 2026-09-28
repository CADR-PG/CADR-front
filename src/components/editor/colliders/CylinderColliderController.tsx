import { CylinderCollider } from '@react-three/rapier';
import ControllerProps from '../../../types/ControllerProps';
import Cylinder from '../../../engine/components/colliders/Cylinder';
import physicsHandlers from '../../../engine/handlers/Physics';
import usePhysics from '../../../hooks/usePhysics';
import useWorldTransform from '@/hooks/useWorldTransform';

export default function CylinderColliderController({
  entity,
}: ControllerProps) {
  const { params, args } = usePhysics<Cylinder>(entity);
  const t = useWorldTransform(entity);
  return (
    params && (
      <CylinderCollider
        {...physicsHandlers}
        {...params}
        args={[args.halfHeight, args.radius]}
        key={`${args.halfHeight} ${args.radius} ${t?.position} ${t?.rotation} ${t?.scale}`}
      />
    )
  );
}
