import { Checkbox, TextField } from '@mui/material';
import Light, { LightData } from '../../../engine/components/Light';
import { ECS } from '../../../engine/ECS';
import { Entity } from '../../../engine/Entity';
import NumberField from '../../NumberField';
import InspectorKey from './InspectorKey';
import { ChangeEvent } from 'react';
import ColorPicker from './ColorPicker';
import LightType from './LightType';

interface LightInspectorProps<T extends LightData> {
  entity: Entity;
  data: T;
}

export default function LightInspector<T extends LightData>({
  entity,
  data,
}: LightInspectorProps<T>) {
  const lightWrite = ECS.instance.entityManager.getComponent(Light, entity);

  function handleChange<K extends keyof T>(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    data: T,
    key: K,
  ) {
    const type = typeof data[key];

    switch (type) {
      case 'string':
        data[key] = e.currentTarget.value as T[K];
        break;
      case 'number':
        data[key] = Number(e.currentTarget.value) as T[K];
        break;
      case 'boolean':
        if (e.currentTarget instanceof HTMLTextAreaElement) return;
        data[key] = e.currentTarget.checked as T[K];
        break;
    }
  }

  function handleNumber<K extends keyof T>(value: number | null, key: K) {
    if (lightWrite && value !== null) {
      (lightWrite.data as T)[key] = value as T[K];
    }
  }

  function renderSwitch<K extends keyof T>(key: K) {
    if (!lightWrite) return;
    switch (key) {
      case 'type':
        return <LightType entity={entity} type={data.type} />;
      case 'color':
      case 'groundColor':
      case 'skyColor':
        return (
          <ColorPicker
            entity={entity}
            componentColor={'color' in data ? (data.color as number) : 0}
          />
        );
    }

    switch (typeof data[key]) {
      case 'number':
        return (
          <NumberField
            value={data[key as keyof T] as number}
            onValueChange={(value: number | null) => handleNumber(value, key)}
            size="small"
          />
        );
      case 'boolean':
        return (
          <div className="inspector-input-checkbox">
            <Checkbox
              checked={data[key]}
              onChange={(e) => handleChange(e, lightWrite.data as T, key)}
              size="small"
            />
          </div>
        );
      case 'string':
        return (
          <TextField
            value={data[key as keyof LightData]}
            onChange={(e) => handleChange(e, lightWrite.data as T, key)}
            size="small"
          />
        );
      default:
        break;
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
