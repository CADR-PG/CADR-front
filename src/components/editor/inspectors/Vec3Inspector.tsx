import { Vec3 } from '../../../engine/components/Transform';
import { Entity } from '../../../engine/Entity';

interface Vec3InspectorProps {
  entity: Entity;
  keyName: string;
  value: Vec3;
}

export default function Vec3Inspector({
  entity,
  keyName,
  value,
}: Vec3InspectorProps) {}
