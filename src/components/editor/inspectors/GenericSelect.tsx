import Select from '@mui/material/Select';
import { Component, ComponentType } from '../../../engine/Component';
import { ECS } from '../../../engine/ECS';
import { Entity } from '../../../engine/Entity';
import useEntityManager from '../../../hooks/useEntityManager';
import TypedMenuItem from '../../TypedMenuItem';

interface GenericSelectProps<T extends Component, S = T> {
  entity: Entity;
  componentType: ComponentType<T>;
  componentKey: keyof S;
  select?: (component: T) => S;
  options: { [name: string]: string | number | undefined | boolean };
}

export default function GenericSelect<T extends Component, S = T>({
  entity,
  componentType,
  componentKey,
  select,
  options,
}: GenericSelectProps<T, S>) {
  const em = useEntityManager();
  const c = em.getComponent(componentType, entity);
  const componentWrite = ECS.instance.entityManager.getComponent(
    componentType,
    entity,
  );

  if (!c || !componentWrite) return;

  const pick = select ?? ((c: T) => c as unknown as S);

  const read = pick(c);
  const write = pick(componentWrite);

  return (
    <Select<string | number | boolean>
      displayEmpty
      onChange={(e) => {
        if (!componentWrite) return null;
        (write as Record<keyof S, unknown>)[componentKey] = e.target.value;
        console.log(componentKey, '=', write[componentKey]);
      }}
      value={read[componentKey] as string | number | undefined | boolean}
      size="small"
    >
      {Object.keys(options).map((option) => {
        return (
          <TypedMenuItem
            key={option}
            value={options[option] === undefined ? '' : options[option]}
          >
            {option.replace('_', ' ')}
          </TypedMenuItem>
        );
      })}
    </Select>
  );
}
