import { Fragment, ReactNode } from 'react';
import { Component, ComponentType } from '../../../engine/Component';
import { Entity } from '../../../engine/Entity';
import useEntityManager from '../../../hooks/useEntityManager';
import { ECS } from '../../../engine/ECS';
import NumberField from '../../NumberField';
import { Checkbox, TextField } from '@mui/material';
import InspectorKey from './InspectorKey';
import { Vec3 } from '../../../engine/components/Transform';

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
  skipKeys = ['name', 'element', 'data', 'fileId'],
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

  const setField = (key: keyof S, value: string | number | boolean) => {
    (write as Record<keyof S, unknown>)[key] = value;
  };

  const setVecField = (key: keyof S, value: number, index: 0 | 1 | 2) => {
    (write as Record<keyof S, Vec3>)[key][index] = value;
  };

  const isVec3 = (key: unknown): key is Vec3 => {
    return (
      Array.isArray(key) &&
      key.length === 3 &&
      typeof key[0] === 'number' &&
      typeof key[1] === 'number' &&
      typeof key[2] === 'number'
    );
  };

  const renderSwitch = (key: keyof S) => {
    const special = specialRender?.(key);
    if (special !== undefined) return special;

    const value = read[key];

    if (isVec3(value)) {
      return (
        <>
          <div className="inspector-input-columns">
            <NumberField
              className="inspector-input-columns-column"
              value={value[0]}
              onValueChange={(value) => setVecField(key, value!, 0)}
              size="small"
              label="x"
            />
            <NumberField
              className="inspector-input-columns-column"
              value={value[1]}
              onValueChange={(value) => setVecField(key, value!, 1)}
              size="small"
              label="y"
            />
            <NumberField
              className="inspector-input-columns-column"
              value={value[2]}
              onValueChange={(value) => setVecField(key, value!, 2)}
              size="small"
              label="z"
            />
          </div>
        </>
      );
    }

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
