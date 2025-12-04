import { ChangeEvent } from 'react';
import Geometry, {
  GeometryData,
  Point,
} from '../../../engine/components/Geometry';
import { ECS } from '../../../engine/ECS';
import { Entity } from '../../../engine/Entity';
import Points from './Points';
import Type from './Type';

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
    e: ChangeEvent<HTMLInputElement>,
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
        data[key] = e.currentTarget.checked as T[K];
        break;
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
          <input
            type="number"
            value={data[key as keyof GeometryData]}
            onChange={(e) => handleChange(e, geometryWrite.data as T, key)}
          />
        );
      case 'boolean':
        return (
          <input
            type="checkbox"
            checked={data[key]}
            onChange={(e) => handleChange(e, geometryWrite.data as T, key)}
          />
        );
      case 'string':
        return (
          <input
            value={data[key as keyof GeometryData]}
            onChange={(e) => handleChange(e, geometryWrite.data as T, key)}
          />
        );
      default:
        break;
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
