import { Entity } from '../../../engine/Entity';
import { ECS } from '../../../engine/ECS';
import RBody from '../../../engine/components/RigidBody';
import { ChangeEvent } from 'react';
import { Checkbox, TextField } from '@mui/material';
import NumberField from '../../NumberField';
import useEntityManager from '../../../hooks/useEntityManager';
import InspectorKey from './InspectorKey';
import Colliders from './Colliders';
import { ActiveCollisionTypes } from '../../../engine/components/Collider';
import ActiveCollisionTypesInspector from './ActiveCollisionTypesInspector';
import RigidBodyType from './RigidBodyType';

interface RigidBodyInspectorProps {
  entity: Entity;
}

export default function RigidBodyInspector({
  entity,
}: RigidBodyInspectorProps) {
  const em = useEntityManager();
  const rigidBodyWrite = ECS.instance.entityManager.getComponent(RBody, entity);
  const rigidBody = em.getComponent(RBody, entity);

  if (!rigidBodyWrite || !rigidBody) return;

  function handleChange<K extends keyof RBody>(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    key: K,
  ) {
    if (!rigidBodyWrite) return;

    const type = e.currentTarget.type;
    switch (type) {
      case 'text':
        rigidBodyWrite[key] = e.currentTarget.value as RBody[K];
        break;
      case 'checkbox':
        if (e.currentTarget instanceof HTMLTextAreaElement) return;
        rigidBodyWrite[key] = e.currentTarget.checked as RBody[K];
        break;
    }
  }

  function handleNumber<K extends keyof RBody>(value: number | null, key: K) {
    if (!rigidBodyWrite || value === null) return;

    rigidBodyWrite[key] = value as RBody[K];
  }

  function renderSwitch<K extends keyof RBody>(key: K) {
    if (!rigidBodyWrite || !rigidBody) return;

    switch (key) {
      case 'name':
        return;
      case 'colliders':
        return <Colliders entity={entity} type={rigidBody.colliders} />;
      case 'activeCollisionTypes':
        return (
          <ActiveCollisionTypesInspector
            entity={entity}
            collisionType={rigidBody.activeCollisionTypes}
          />
        );
      case 'type':
        return <RigidBodyType entity={entity} type={rigidBody.type} />;
    }

    switch (typeof rigidBody[key]) {
      case 'string':
        return (
          <TextField
            size="small"
            value={rigidBodyWrite[key]}
            onChange={(e) => handleChange(e, key)}
          />
        );
      case 'number':
        return (
          <NumberField
            value={rigidBodyWrite[key]}
            onValueChange={(value: number | null) => handleNumber(value, key)}
            size="small"
          />
        );
      case 'boolean':
        return (
          <div className="inspector-input-checkbox">
            <Checkbox
              checked={rigidBodyWrite[key]}
              onChange={(e) => handleChange(e, key)}
              size="small"
            />
          </div>
        );
    }
  }

  return Object.keys(rigidBody).map((key) => {
    if (key === 'name' || key === 'element' || key === 'data') return;
    return (
      <>
        <InspectorKey keyName={key} />
        {renderSwitch(key as keyof RBody)}
      </>
    );
  });
}
