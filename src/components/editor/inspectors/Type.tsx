import { ChangeEvent } from 'react';
import Geometry from '../../../engine/components/Geometry';
import { ECS } from '../../../engine/ECS';
import { Entity } from '../../../engine/Entity';
import Objects from '../../../data/ObjectNames';

interface TypeProps {
  entity: Entity;
  type: string;
}

export default function Type({ entity, type }: TypeProps) {
  const geometryWrite = ECS.instance.entityManager.getComponent(
    Geometry,
    entity,
  );

  if (!geometryWrite) return;

  const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    if (!geometryWrite) return;

    const name = e.currentTarget.value;

    ECS.instance.entityManager.removeComponent(Geometry, entity);
    ECS.instance.entityManager.addComponent(
      new Geometry(new Objects[name]()),
      entity,
    );
  };

  return (
    <select onChange={handleSelect} defaultValue={type}>
      {Object.keys(Objects).map((object) => {
        return (
          <option key={object} value={object}>
            {object}
          </option>
        );
      })}
    </select>
  );
}
