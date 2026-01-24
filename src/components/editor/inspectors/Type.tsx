import Geometry from '../../../engine/components/Geometry';
import { ECS } from '../../../engine/ECS';
import { Entity } from '../../../engine/Entity';
import Objects from '../../../data/ObjectNames';
import { MenuItem, Select, SelectChangeEvent } from '@mui/material';

interface TypeProps {
  entity: Entity;
  type: string;
}

export default function Type({ entity, type }: TypeProps) {
  const geometryWrite = ECS.instance.entityManager.getComponent(
    Geometry,
    entity,
  );

  if (!geometryWrite) return;

  const handleSelect = (e: SelectChangeEvent) => {
    if (!geometryWrite) return;

    const name = e.target.value;

    ECS.instance.entityManager.removeComponent(Geometry, entity);
    ECS.instance.entityManager.addComponent(
      new Geometry(new Objects[name]()),
      entity,
    );
  };

  return (
    <Select onChange={handleSelect} value={type} size="small">
      {Object.keys(Objects).map((object) => {
        return (
          <MenuItem key={object} value={object}>
            {object}
          </MenuItem>
        );
      })}
    </Select>
  );
}
