import { Fragment, ReactNode } from 'react';
import { Component, ComponentType } from '../../../engine/Component';
import { Entity } from '../../../engine/Entity';
import useEntityManager from '../../../hooks/useEntityManager';
import { ECS } from '../../../engine/ECS';
import NumberField from '../../NumberField';
import { Checkbox, TextField } from '@mui/material';
import InspectorKey from './InspectorKey';

interface InspectorTemplateProps<T extends Component, S = T> {
  entity: Entity;
  componentType: ComponentType<T>;
  select?: (component: T) => S;
  skipKeys?: readonly string[];
  specialRender?: (key: keyof S) => ReactNode;
}

export default function InspectorTemplate<T extends Component, S = T>({
  entity,
  componentType,
  select,
  specialRender,
  skipKeys = ['name', 'element', 'data'],
}: InspectorTemplateProps<T, S>) {
  const em = useEntityManager();
  const component = em.getComponent(componentType, entity);
  const componentWrite = ECS.instance.entityManager.getComponent(
    componentType,
    entity,
  );

  if (!component || !componentWrite) return null;

  const pick = select ?? ((c: T) => c as unknown as S);

  const read = pick(component);
  const write = pick(componentWrite);

  console.log('pizda', component, componentWrite);
  console.log('dupa', read, write);

  const setField = (key: keyof S, value: string | number | boolean) => {
    (write as Record<keyof S, unknown>)[key] = value;
  };

  const renderSwitch = (key: keyof S) => {
    const special = specialRender?.(key);
    if (special !== undefined) return special;

    const value = read[key];

    if (typeof value === 'number') {
      return (
        <NumberField
          value={value}
          onValueChange={(v: number | null) => v !== null && setField(key, v)}
          size="small"
        />
      );
    }

    if (typeof value === 'boolean') {
      return (
        <div className="inspector-input-checkbox">
          <Checkbox
            checked={value}
            onChange={(e) => setField(key, e.currentTarget.checked)}
            size="small"
          />
        </div>
      );
    }

    if (typeof value === 'string') {
      return (
        <TextField
          value={value}
          onChange={(e) => setField(key, e.currentTarget.value)}
          size="small"
        />
      );
    }

    return null;
  };

  return (
    <>
      {Object.keys(read as object).map((key) => {
        if (skipKeys.includes(key)) return null;
        return (
          <Fragment key={String(key)}>
            <InspectorKey keyName={key} />
            {renderSwitch(key as keyof S)}
          </Fragment>
        );
      })}
    </>
  );
}
