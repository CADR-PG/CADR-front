import { ECS } from '../../../engine/ECS';
import { MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { Entity } from '../../../engine/Entity';
import { Component, ComponentType } from '../../../engine/Component';
import useEntityManager from '../../../hooks/useEntityManager';

interface HasData<S> {
  data: S & { type: string };
}

interface GenericFactory<S, T extends Component & HasData<S>> {
  entity: Entity;
  component: ComponentType<T>;
  data: { [name: string]: new () => S };
}

export default function GenericFactory<S, T extends Component & HasData<S>>({
  entity,
  component,
  data,
}: GenericFactory<S, T>) {
  const em = useEntityManager();
  const c = em.getComponent(component, entity);
  const cw = ECS.instance.entityManager.getComponent(component, entity);

  if (!c || !cw) return;

  const handleSelect = (e: SelectChangeEvent) => {
    if (!cw) return;

    const name = e.target.value;

    ECS.instance.entityManager.removeComponent(component, entity);
    ECS.instance.entityManager.addComponent(
      new component(new data[name]()),
      entity,
    );
  };

  return (
    <Select onChange={handleSelect} value={c.data.type} size="small">
      {Object.keys(data).map((object) => {
        return (
          <MenuItem key={object} value={object}>
            {object}
          </MenuItem>
        );
      })}
    </Select>
  );
}
