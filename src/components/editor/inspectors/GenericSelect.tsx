import { MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { Component, ComponentType } from '../../../engine/Component';
import { ECS } from '../../../engine/ECS';
import { Entity } from '../../../engine/Entity';

interface GenericSelectProps<T extends ComponentType, K extends Component> {
  entity: Entity;
  componentType: T;
  componentKey: keyof K;
  value: string;
  options: { [name: string]: string };
}

export default function GenericSelect<
  T extends ComponentType,
  K extends Component,
>({
  entity,
  componentType,
  componentKey,
  value,
  options,
}: GenericSelectProps<T, K>) {
  const componentWrite = ECS.instance.entityManager.getComponent(
    componentType,
    entity,
  );

  const handleSelect = (e: SelectChangeEvent) => {
    if (!componentWrite) return null;

    const v = e.target.value;

    componentWrite[componentKey] = v;
  };

  return (
    <Select onChange={handleSelect} value={value} size="small">
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
