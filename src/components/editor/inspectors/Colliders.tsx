import { MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { Entity } from '../../../engine/Entity';
import { ECS } from '../../../engine/ECS';
import RBody from '../../../engine/components/RigidBody';
import { RigidBodyAutoCollider } from '@react-three/rapier';
import { useEffect, useState } from 'react';

interface CollidersProps {
  entity: Entity;
  type: RigidBodyAutoCollider | undefined;
}

export default function Colliders({ entity, type }: CollidersProps) {
  // MenuItem needs string value, so use a proxy state
  const [item, setItem] = useState(() => {
    if (type === undefined) return 'undefined';
    if (type === false) return 'false';
    return type;
  });

  // uhhhh... needed?
  useEffect(() => {
    setItem(() => {
      if (type === undefined) return 'undefined';
      if (type === false) return 'false';
      return type;
    });
  }, [entity]);
  const rigidBodyWrite = ECS.instance.entityManager.getComponent(RBody, entity);

  if (!rigidBodyWrite) return;

  const handleSelect = (e: SelectChangeEvent) => {
    const value = e.target.value;
    if (value === 'undefined') rigidBodyWrite.colliders = undefined;
    else if (value === 'false') rigidBodyWrite.colliders = false;
    else rigidBodyWrite.colliders = e.target.value as RigidBodyAutoCollider;
    setItem(value);
  };

  return (
    <Select onChange={handleSelect} value={item} size="small">
      <MenuItem value={'false'}>Disabled</MenuItem>
      <MenuItem value={'undefined'}>Automatic</MenuItem>
      <MenuItem value={'ball'}>Ball</MenuItem>
      <MenuItem value={'cuboid'}>Cuboid</MenuItem>
      <MenuItem value={'hull'}>Hull</MenuItem>
      <MenuItem value={'trimesh'}>Trimesh</MenuItem>
    </Select>
  );
}
