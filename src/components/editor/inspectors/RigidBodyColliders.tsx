import { MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { Entity } from '../../../engine/Entity';
import { ECS } from '../../../engine/ECS';
import Material from '../../../engine/components/Material';
import Materials from '../../../data/MaterialNames';

interface MaterialTypeProps {
  entity: Entity;
  type: string;
}

export default function MaterialType({ entity, type }: MaterialTypeProps) {
  const materialWrite = ECS.instance.entityManager.getComponent(
    Material,
    entity,
  );

  if (!materialWrite) return;

  const handleSelect = (e: SelectChangeEvent) => {
    if (!materialWrite) return;

    const name = e.target.value;

    ECS.instance.entityManager.removeComponent(Material, entity);
    ECS.instance.entityManager.addComponent(
      new Material(new Materials[name]()),
      entity,
    );
  };

  return (
    <Select onChange={handleSelect} value={type} size="small">
      {Object.keys(Materials).map((material) => {
        return (
          <MenuItem key={material} value={material}>
            {material}
          </MenuItem>
        );
      })}
    </Select>
  );
}
