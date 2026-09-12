import { Fragment, ReactNode } from 'react';
import { Component, ComponentType } from '../../../engine/Component';
import { Entity } from '../../../engine/Entity';
import useEntityManager from '../../../hooks/useEntityManager';
import { ECS } from '../../../engine/ECS';
import NumberField from '../../NumberField';
import { Checkbox, TextField } from '@mui/material';
import InspectorKey from './InspectorKey';

interface InspectorTemplateProps<T extends Component> {
  entity: Entity;
  componentType: ComponentType<T>;
  specialRender?: (key: keyof T) => ReactNode;
}

export default function InspectorTemplate<T extends Component>({
  entity,
  componentType,
  specialRender,
}: InspectorTemplateProps<T>) {
  const em = useEntityManager();
  const component = em.getComponent(componentType, entity);
  const componentWrite = ECS.instance.entityManager.getComponent(
    componentType,
    entity,
  );

  if (!component || !componentWrite) return null;

  const setField = (key: keyof T, value: string | number | boolean) => {
    (componentWrite as Record<keyof T, unknown>)[key] = value;
  };

  const renderSwitch = (key: keyof T) => {
    const special = specialRender?.(key);
    if (special !== undefined) return special;

    const value = component[key];

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
      {Object.keys(component).map((key) => {
        if (key === 'name' || key === 'element') return null;
        return (
          <Fragment key={String(key)}>
            <InspectorKey keyName={key} />
            {renderSwitch(key as keyof T)}
          </Fragment>
        );
      })}
    </>
  );
}
