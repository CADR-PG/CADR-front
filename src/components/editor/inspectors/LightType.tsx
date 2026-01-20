import { MenuItem, Select, SelectChangeEvent } from '@mui/material';
import Light from '../../../engine/components/Light';
import { ECS } from '../../../engine/ECS';
import { Entity } from '../../../engine/Entity';
import Lights from '../../../data/LightNames';

interface LightTypeProps {
  entity: Entity;
  type: string;
}

export default function LightType({ entity, type }: LightTypeProps) {
  const lightWrite = ECS.instance.entityManager.getComponent(Light, entity);

  if (!lightWrite) return;

  const handleSelect = (e: SelectChangeEvent) => {
    if (!lightWrite) return;

    const name = e.target.value;

    ECS.instance.entityManager.removeComponent(Light, entity);
    ECS.instance.entityManager.addComponent(
      new Light(new Lights[name]()),
      entity,
    );
  };

  return (
    <Select onChange={handleSelect} value={type} size="small">
      {Object.keys(Lights).map((light) => {
        return (
          <MenuItem key={light} value={light}>
            {light}
          </MenuItem>
        );
      })}
    </Select>
  );
}
