import { MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { ActiveCollisionTypes } from '../../../engine/components/Collider';

interface ActiveCollisionTypesComponent {
  activeCollisionTypes: number;
}

interface CollidersProps<T extends ActiveCollisionTypesComponent> {
  collisionType: ActiveCollisionTypes;
  componentWrite: T;
}

export default function ActiveCollisionTypesInspector<
  T extends ActiveCollisionTypesComponent,
>({ collisionType, componentWrite }: CollidersProps<T>) {
  const handleSelect = (e: SelectChangeEvent) => {
    componentWrite.activeCollisionTypes = Number(e.target.value);
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
