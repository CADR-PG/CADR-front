import { ChangeEvent } from 'react';
import Geometry, {
  GeometryData,
  Point,
} from '../../../engine/components/Geometry';
import { ECS } from '../../../engine/ECS';
import { Entity } from '../../../engine/Entity';
import Points from './Points';
import Type from './Type';
import { Checkbox, TextField } from '@mui/material';
import NumberField from '../../NumberField';
import InspectorKey from './InspectorKey';

interface GeometryInspectorProps<T extends GeometryData> {
  entity: Entity;
  data: T;
}

export default function GeometryInspector<T extends GeometryData>({
  entity,
  data,
}: GeometryInspectorProps<T>) {
  const geometryWrite = ECS.instance.entityManager.getComponent(
    Geometry,
    entity,
  );

  if (!geometryWrite) return;

  // NOTE(m1k53r): this is a little complicated, but it says that
  // T is a child of GeometryData and K is a key of that type.
  // This is exactly what I wanted (thanks ChatGPT),
  // but as I said, a little hard to read. The same thing will probably
  // be implemented for other inspectors.
  //
  // NOTE(m1k53r): this is a normal function instead of arrow, because
  // Treesitter in NeoVim breaks with generic arrows lol.
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
    if (geometryWrite && value !== null) {
      (geometryWrite.data as T)[key] = value as T[K];
    }
  }

  function renderSwitch<K extends keyof T>(key: K) {
    if (!geometryWrite) return;

    switch (key) {
      case 'type':
        return <Type entity={entity} type={data.type} />;
      case 'points':
        return (
          <Points
            entity={entity}
            points={'points' in data ? (data.points as Point[]) : []}
          />
        );
      default:
        break;
    }

    switch (typeof data[key]) {
      case 'number':
        return (
          <NumberField
            value={data[key as keyof T] as number}
            onValueChange={(value) => handleNumber(value, key)}
            size="small"
          />
        );
      case 'boolean':
        return (
          <div className="input-checkbox">
            <Checkbox
              checked={data[key]}
              onChange={(e) => handleChange(e, geometryWrite.data as T, key)}
              size="small"
            />
          </div>
        );
      case 'string':
        return (
          <TextField
            value={data[key as keyof GeometryData]}
            onChange={(e) => handleChange(e, geometryWrite.data as T, key)}
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
