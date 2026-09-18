import { MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { Component, ComponentType } from '../../../engine/Component';
import { ECS } from '../../../engine/ECS';
import { Entity } from '../../../engine/Entity';
import useEntityManager from '../../../hooks/useEntityManager';

interface GenericSelectProps<T extends Component> {
  entity: Entity;
  componentType: ComponentType<T>;
  componentKey: keyof T;
  value: string;
  options: { [name: string]: string };
}

export default function GenericSelect<T extends Component>({
  entity,
  componentType,
  componentKey,
  value,
  options,
}: GenericSelectProps<T>) {
  const em = useEntityManager();
  const c = em.getComponent(componentType, entity);
  const componentWrite = ECS.instance.entityManager.getComponent(
    componentType,
    entity,
  );

  if (!c) return;

  const type = typeof c[componentKey];

  if (!c[componentKey] || (type !== 'string' && type !== 'number')) return;

  const handleSelect = (e: SelectChangeEvent) => {
    if (!componentWrite) return null;

    const v = e.target.value;

    componentWrite[componentKey] = v;
  };

  return (
    <Select onChange={handleSelect} value={c[componentKey]} size="small">
      {Object.keys(options).map((option) => {
        return (
          <MenuItem key={option} value={option}>
            {options[option]}
          </MenuItem>
        );
      })}
    </Select>
  );
}
