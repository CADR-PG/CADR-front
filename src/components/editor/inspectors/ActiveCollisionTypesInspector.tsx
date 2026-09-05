import { MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { Entity } from '../../../engine/Entity';
import { ECS } from '../../../engine/ECS';
import RBody from '../../../engine/components/RigidBody';
import { ActiveCollisionTypes } from '../../../engine/components/Collider';

interface CollidersProps {
  entity: Entity;
  collisionType: ActiveCollisionTypes;
}

export default function ActiveCollisionTypesInspector({
  entity,
  collisionType,
}: CollidersProps) {
  const rigidBodyWrite = ECS.instance.entityManager.getComponent(RBody, entity);

  if (!rigidBodyWrite) return;

  const handleSelect = (e: SelectChangeEvent) => {
    rigidBodyWrite.activeCollisionTypes = Number(e.target.value);
    console.log(rigidBodyWrite.activeCollisionTypes);
  };

  return (
    <Select
      onChange={handleSelect}
      value={collisionType.toString()}
      size="small"
    >
      <MenuItem value={ActiveCollisionTypes.ALL.toString()}>All</MenuItem>
      <MenuItem value={ActiveCollisionTypes.DEFAULT.toString()}>
        Default
      </MenuItem>
      <MenuItem value={ActiveCollisionTypes.DYNAMIC_DYNAMIC.toString()}>
        Dynamic-Dynamic
      </MenuItem>
      <MenuItem value={ActiveCollisionTypes.DYNAMIC_FIXED.toString()}>
        Dynamic-Fixed
      </MenuItem>
      <MenuItem value={ActiveCollisionTypes.DYNAMIC_KINEMATIC.toString()}>
        Dynamic-Kinematic
      </MenuItem>
      <MenuItem value={ActiveCollisionTypes.FIXED_FIXED.toString()}>
        Fixed-Fixed
      </MenuItem>
      <MenuItem value={ActiveCollisionTypes.KINEMATIC_FIXED.toString()}>
        Kinematic-Fixed
      </MenuItem>
      <MenuItem value={ActiveCollisionTypes.KINEMATIC_KINEMATIC.toString()}>
        Kinematic-Kinematic
      </MenuItem>
    </Select>
  );
}
