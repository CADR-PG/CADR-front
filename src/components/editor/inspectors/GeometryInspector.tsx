import { ChangeEvent } from 'react';
import Geometry, { GeometryData } from '../../../engine/components/Geometry';
import { ECS } from '../../../engine/ECS';
import { Entity } from '../../../engine/Entity';
import Objects from '../../../data/ObjectNames';
import Points from './Points';
import Type from './Type';

interface GeometryInspectorProps {
  entity: Entity;
  data: GeometryData;
}

export default function GeometryInspector({
  entity,
  data,
}: GeometryInspectorProps) {
  const geometryWrite = ECS.instance.entityManager.getComponent(
    Geometry,
    entity,
  );

  if (!geometryWrite) return;

  const handleChange = (e: ChangeEvent<HTMLInputElement>, key: string) => {
    const type = e.currentTarget.type;

    console.log('click');

    switch (type) {
      case 'text':
        geometryWrite.data[key] = e.currentTarget.value;
        break;
      case 'number':
        geometryWrite.data[key] = Number(e.currentTarget.value);
        break;
      case 'boolean':
        geometryWrite.data[key] = e.currentTarget.checked;
        break;
    }
  };

  const renderSwitch = (key: string) => {
    if (!geometryWrite) return;

    switch (key) {
      case 'type':
        return <Type entity={entity} type={data.type} />;
      case 'points':
        return <Points entity={entity} points={data.points} />;
      default:
        break;
    }

    switch (typeof data[key as keyof GeometryData]) {
      case 'number':
        return (
          <input
            type="number"
            value={data[key as keyof GeometryData]}
            onChange={(e) => handleChange(e, key)}
          />
        );
      case 'boolean':
        return (
          <input
            type="checkbox"
            // TODO(m1k53r): this doesn't work lol
            checked={data[key as keyof GeometryData]}
            onChange={(e) => handleChange(e, key)}
          />
        );
      case 'string':
        return (
          <input
            value={data[key as keyof GeometryData]}
            onChange={(e) => handleChange(e, key)}
          />
        );
      default:
        break;
    }
  };

  return (
    <>
      {Object.keys(data).map((key) => {
        return (
          <div className="inspector-panel" key={key}>
            <div className="inspector-field">{key}</div>
            <div className="inspector-input">{renderSwitch(key)}</div>
          </div>
        );
      })}
    </>
  );
}
