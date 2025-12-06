import { ChangeEvent } from 'react';
import Material, { MaterialData } from '../../../engine/components/Material';
import { Entity } from '../../../engine/Entity';
import { ECS } from '../../../engine/ECS';
import ColorPicker from './ColorPicker';
import EnvMapRotation from './EnvMapRotation';
import Wireframe from './Wireframe';
import { Checkbox, TextField } from '@mui/material';
import NumberField from '../../NumberField';

interface MaterialInspectorProps<T extends MaterialData> {
  entity: Entity;
  data: T;
}

export default function MaterialInspector<T extends MaterialData>({
  entity,
  data,
}: MaterialInspectorProps<T>) {
  const materialWrite = ECS.instance.entityManager.getComponent(
    Material,
    entity,
  );

  if (!materialWrite) return;

  function handleChange<K extends keyof T>(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    key: K,
  ) {
    if (!materialWrite) return;

    const type = e.currentTarget.type;
    switch (type) {
      case 'text':
        (materialWrite.data as T)[key] = e.currentTarget.value as T[K];
        break;
      case 'checkbox':
        (materialWrite.data as T)[key] = e.currentTarget.checked as T[K];
        break;
    }
  }

  function handleNumber<K extends keyof T>(value: number | null, key: K) {
    if (!materialWrite || value === null) return;

    (materialWrite.data as T)[key] = value as T[K];
  }

  function renderSwitch<K extends keyof T>(key: K) {
    switch (key) {
      case 'type':
        return null;
      case 'color':
        return (
          <ColorPicker
            entity={entity}
            componentColor={'color' in data ? (data.color as number) : 0}
          />
        );
      case 'envMapRotation':
        return (
          <EnvMapRotation
            entity={entity}
            envMapRotation={
              'envMapRotation' in data
                ? (data.envMapRotation as [number, number, number])
                : [0, 0, 0]
            }
          />
        );
      case 'wireframeLinecap':
      case 'wireframeLinejoin':
        return (
          <Wireframe
            entity={entity}
            // TODO(m1k53r): this is kinda stupid. we should probably have
            // a separate type for this.
            wireframe={data[key] as 'round' | 'bevel' | 'miter'}
            wireframeKey={key}
          />
        );
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
            onValueChange={(value) => handleNumber(value, key)}
            size="small"
          />
        );
      case 'boolean':
        return (
          <Checkbox
            checked={data[key]}
            onChange={(e) => handleChange(e, key)}
            size="small"
          />
        );
    }
  }

  return (
    <>
      {Object.keys(data).map((key) => {
        return (
          <div className="inspector-panel" key={key}>
            <div className="inspector-field">{key}</div>
            <div className="inspector-input">
              {renderSwitch(key as keyof T)}
            </div>
          </div>
        );
      })}
    </>
  );
}
