import { ChangeEvent } from 'react';
import { ECS } from '../../../engine/ECS';
import { Entity } from '../../../engine/Entity';
import { Checkbox, TextField } from '@mui/material';
import NumberField from '../../NumberField';
import InspectorKey from './InspectorKey';
import cAudio from '../../../engine/components/Audio';
import useEntityManager from '../../../hooks/useEntityManager';
import AudioDropArea from './AudioDropArea';
import { ComponentType } from '../../../engine/Component';

interface AudioInspectorProps<T extends cAudio> {
  entity: Entity;
  componentType: ComponentType<T>;
}

export default function AudioInspector<T extends cAudio>({
  entity,
  componentType,
}: AudioInspectorProps<T>) {
  const em = useEntityManager();
  const audio = em.getComponent(componentType, entity);
  const audioWrite = ECS.instance.entityManager.getComponent(
    componentType,
    entity,
  );

  if (!audioWrite || !audio) return null;

  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    key: keyof cAudio,
  ) {
    if (!audioWrite) return;

    const type = typeof audioWrite[key];

    switch (type) {
      case 'string':
        (audioWrite[key] as string) = e.currentTarget.value;
        break;
      case 'boolean':
        if (e.currentTarget instanceof HTMLTextAreaElement) return;
        (audioWrite[key] as boolean) = !!e.currentTarget.checked;
        break;
    }
  }

  function handleNumber(value: number | null, key: keyof cAudio) {
    if (audioWrite && value !== null) {
      (audioWrite[key] as number) = value;
    }
  }

  function renderSwitch(key: keyof cAudio) {
    if (!audioWrite || !audio) return;

    switch (key) {
      case 'name':
        return null;
      case 'element':
        return null;
      case 'source':
        return <AudioDropArea entity={entity} componentType={componentType} />;
      default:
        break;
    }

    switch (typeof audio[key]) {
      case 'number':
        return (
          <NumberField
            value={audio[key] as number}
            onValueChange={(value: number | null) => handleNumber(value, key)}
            size="small"
          />
        );
      case 'boolean':
        return (
          <div className="inspector-input-checkbox">
            <Checkbox
              checked={audio[key]}
              onChange={(e) => handleChange(e, key)}
              size="small"
            />
          </div>
        );
      case 'string':
        return (
          <TextField
            value={audio[key]}
            onChange={(e) => handleChange(e, key)}
            size="small"
          />
        );
      default:
        break;
    }
  }

  return Object.keys(audio).map((key) => {
    if (key === 'name' || key === 'element') return null;
    return (
      <>
        <InspectorKey keyName={key} />
        {renderSwitch(key as keyof cAudio)}
      </>
    );
  });
}
