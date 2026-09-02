import { Checkbox, TextField } from '@mui/material';
import Collider, { ColliderData } from '../../../engine/components/Collider';
import { ECS } from '../../../engine/ECS';
import { Entity } from '../../../engine/Entity';
import InspectorKey from './InspectorKey';
import NumberField from '../../NumberField';
import { ChangeEvent } from 'react';
import ColliderTypeInspector from './ColliderTypeInspector';

interface ColliderDataInspectorProps<T extends ColliderData> {
  entity: Entity;
  data: T;
}

export default function ColliderDataInspector<T extends ColliderData>({
  entity,
  data,
}: ColliderDataInspectorProps<T>) {
  const colliderWrite = ECS.instance.entityManager.getComponent(
    Collider,
    entity,
  );

  if (!colliderWrite) return;

  function handleChange<K extends keyof T>(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    key: K,
  ) {
    if (!colliderWrite) return;

    const type = e.currentTarget.type;
    switch (type) {
      case 'text':
        (colliderWrite.data as T)[key] = e.currentTarget.value as T[K];
        break;
      case 'checkbox':
        if (e.currentTarget instanceof HTMLTextAreaElement) return;
        (colliderWrite.data as T)[key] = e.currentTarget.checked as T[K];
        break;
    }
  }

  function handleNumber<K extends keyof T>(value: number | null, key: K) {
    if (!colliderWrite || value === null) return;

    (colliderWrite.data as T)[key] = value as T[K];
  }

  function renderSwitch<K extends keyof T>(key: K) {
    switch (key) {
      case 'type':
        return <ColliderTypeInspector entity={entity} type={data.type} />;
    }

    switch (typeof data[key]) {
      case 'string':
        return (
          <TextField
            size="small"
            value={data[key]}
            onChange={(e) => handleChange(e, key)}
          />
        );
      case 'number':
        return (
          <NumberField
            value={data[key]}
            onValueChange={(value: number | null) => handleNumber(value, key)}
            size="small"
          />
        );
      case 'boolean':
        return (
          <div className="inspector-input-checkbox">
            <Checkbox
              checked={data[key]}
              onChange={(e) => handleChange(e, key)}
              size="small"
            />
          </div>
        );
    }
  }

  return Object.keys(data).map((key) => {
    return (
      <>
        <InspectorKey keyName={key} />
        {renderSwitch(key as keyof T)}
      </>
    );
  });
}
