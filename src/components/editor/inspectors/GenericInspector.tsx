import { ChangeEvent } from 'react';
import { Component } from '../../../engine/Component';
import { Entity } from '../../../engine/Entity';
import { ECS } from '../../../engine/ECS';
import { Checkbox, TextField } from '@mui/material';
import NumberField from '../../NumberField';
import InspectorKey from './InspectorKey';

interface GenericInspectorProps<T extends Component> {
  entity: Entity;
  component: T;
}

export default function GenericInspector<T extends Component>({
  entity,
  component,
}: GenericInspectorProps<T>) {
  if (Object.keys(component).length === 0) return;

  const { name: name, element: _element, ...snap } = component;
  const writeComponent = ECS.instance.entityManager.getComponent(
    ECS.instance.entityManager.mapNameToClass[name],
    entity,
  );

  function handleNumber<K extends keyof T>(value: number | null, key: K) {
    if (!value) return;

    (writeComponent as T)[key] = value as T[K];
  }

  // TODO(m1k53r): does this work correctly? I can't remeber it's been
  // a whole month since I looked at this code lol.
  function handleChange<K extends keyof T>(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    data: T,
    key: K,
  ) {
    if (!writeComponent) return;

    const type = typeof data[key];

    switch (type) {
      case 'string':
        data[key] = e.currentTarget.value as T[K];
        break;
      case 'boolean':
        if (e.currentTarget instanceof HTMLTextAreaElement) return;
        data[key] = e.currentTarget.checked as T[K];
        break;
      default:
        break;
    }
  }

  function renderSwitch<K extends keyof T>(key: K) {
    if (!writeComponent) return;

    switch (typeof component[key]) {
      case 'number':
        return (
          <NumberField
            value={component[key]}
            size="small"
            onValueChange={(value: number | null) => handleNumber(value, key)}
          />
        );
      case 'boolean':
        return (
          <div className="inspector-input-checkbox">
            <Checkbox
              checked={component[key]}
              onChange={(e) => handleChange(e, writeComponent as T, key)}
              size="small"
            />
          </div>
        );
      case 'string':
        return (
          <TextField
            value={component[key]}
            onChange={(e) => handleChange(e, writeComponent as T, key)}
            size="small"
          />
        );
      default:
        break;
    }
  }

  return Object.keys(snap).map((key) => {
    return (
      <>
        <InspectorKey keyName={key} />
        {renderSwitch(key as keyof T)}
      </>
    );
  });
}
