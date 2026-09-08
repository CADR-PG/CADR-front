import { MenuItem, Select, SelectChangeEvent } from '@mui/material';
import Collider from '../../../engine/components/Collider';
import { ECS } from '../../../engine/ECS';
import TypeProps from '../../../types/TypeProps';
import Colliders from '../../../data/ColliderNames';

export default function ColliderTypeInspector({ entity, type }: TypeProps) {
  const colliderWrite = ECS.instance.entityManager.getComponent(
    Collider,
    entity,
  );

  if (!colliderWrite) return;

  const handleSelect = (e: SelectChangeEvent) => {
    const name = e.target.value;

    ECS.instance.entityManager.removeComponent(Collider, entity);
    ECS.instance.entityManager.addComponent(
      new Collider(new Colliders[name]()),
      entity,
    );
  };

  return (
    <Select onChange={handleSelect} value={type} size="small">
      {Object.keys(Colliders).map((collider) => {
        return (
          <MenuItem key={collider} value={collider}>
            {collider}
          </MenuItem>
        );
      })}
    </Select>
  );
}
