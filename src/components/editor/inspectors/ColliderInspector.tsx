import { Checkbox, TextField } from '@mui/material';
import Collider from '../../../engine/components/Collider';
import { Entity } from '../../../engine/Entity';
import InspectorKey from './InspectorKey';
import NumberField from '../../NumberField';
import { ECS } from '../../../engine/ECS';
import { ChangeEvent } from 'react';
import { Vec3 } from '../../../engine/components/Transform';

interface ColliderInspectorProps {
  entity: Entity;
  data: Collider;
}

export default function ColliderInspector({
  entity,
  data,
}: ColliderInspectorProps) {
  const colliderWrite = ECS.instance.entityManager.getComponent(
    Collider,
    entity,
  );

  if (!colliderWrite) return;

  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    key: keyof Collider,
  ) {
    if (!colliderWrite) return;

    const type = e.currentTarget.type;
    switch (type) {
      case 'text':
        (colliderWrite as any)[key as string] = e.currentTarget.value;
        break;
      case 'checkbox':
        if (e.currentTarget instanceof HTMLTextAreaElement) return;
        (colliderWrite as any)[key] = e.currentTarget.checked;
        break;
    }
  }

  function handleNumber(value: number | null, key: keyof Collider) {
    if (!colliderWrite || value === null) return;

    (colliderWrite as any)[key] = value;
  }

  function handleTransformChange(
    value: number | null,
    key: keyof Collider,
    position: number,
  ) {
    if (!colliderWrite || value === null) return;

    (colliderWrite as any)[key][position] = value;
  }

  function renderSwitch(key: keyof Collider) {
    switch (key) {
      case 'name':
        return;
      case 'element':
        return;
      case 'data':
        return;
      case 'position':
      case 'rotation':
      case 'scale':
        return (
          <>
            <div className="inspector-input-columns">
              <NumberField
                className="inspector-input-columns-column"
                value={(data[key] as Vec3)[0]}
                onValueChange={(value) => handleTransformChange(value, key, 0)}
                size="small"
                label="x"
              />
              <NumberField
                className="inspector-input-columns-column"
                value={(data[key] as Vec3)[1]}
                onValueChange={(value) => handleTransformChange(value, key, 1)}
                size="small"
                label="y"
              />
              <NumberField
                className="inspector-input-columns-column"
                value={(data[key] as Vec3)[2]}
                onValueChange={(value) => handleTransformChange(value, key, 2)}
                size="small"
                label="z"
              />
            </div>
          </>
        );
      default:
        break;
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
    if (key === 'name' || key === 'element' || key === 'data') return;
    return (
      <>
        <InspectorKey keyName={key} />
        {renderSwitch(key as keyof Collider)}
      </>
    );
  });
}
