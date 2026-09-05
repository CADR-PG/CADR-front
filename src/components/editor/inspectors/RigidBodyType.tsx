import { MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { Entity } from '../../../engine/Entity';
import { ECS } from '../../../engine/ECS';
import RBody from '../../../engine/components/RigidBody';
import { RigidBodyTypeString } from '@react-three/rapier';

interface RigidBodyTypeProps {
  entity: Entity;
  type: RigidBodyTypeString;
}

export default function RigidBodyType({ entity, type }: RigidBodyTypeProps) {
  const rigidBodyWrite = ECS.instance.entityManager.getComponent(RBody, entity);

  if (!rigidBodyWrite) return;

  const handleSelect = (e: SelectChangeEvent) => {
    rigidBodyWrite.type = e.target.value as RigidBodyTypeString;
  };

  return (
    <Select onChange={handleSelect} value={type} size="small">
      <MenuItem value={'fixed'}>Fixed</MenuItem>
      <MenuItem value={'dynamic'}>Dynamic</MenuItem>
      <MenuItem value={'kinematicPosition'}>Kinematic position</MenuItem>
      <MenuItem value={'kinematicVelocity'}>Kinematic velocity</MenuItem>
    </Select>
  );
}
