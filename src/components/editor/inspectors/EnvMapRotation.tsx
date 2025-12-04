import { ChangeEvent } from 'react';
import Material, { MaterialData } from '../../../engine/components/Material';
import { ECS } from '../../../engine/ECS';
import { Entity } from '../../../engine/Entity';

type envMapRotationType = [number, number, number];

interface MaterialEnvMapData extends MaterialData {
  envMapRotation: envMapRotationType;
}

interface MaterialEnvMap extends Material {
  data: MaterialEnvMapData;
}

interface EnvMapRotationProps {
  entity: Entity;
  envMapRotation: envMapRotationType;
}

export default function EnvMapRotation({
  entity,
  envMapRotation,
}: EnvMapRotationProps) {
  const materialWrite = ECS.instance.entityManager.getComponent(
    Material,
    entity,
  ) as MaterialEnvMap;

  if (!materialWrite) return;

  const handleEnvMap = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    materialWrite.data.envMapRotation[index] = e.currentTarget.valueAsNumber;
  };

  return (
    <div className="inspector-input-columns">
      x:
      <input
        className="inspector-input-columns-column"
        type="number"
        value={envMapRotation[0]}
        onChange={(e) => handleEnvMap(e, 0)}
      />
      y:
      <input
        className="inspector-input-columns-column"
        type="number"
        value={envMapRotation[1]}
        onChange={(e) => handleEnvMap(e, 1)}
      />
      z:
      <input
        className="inspector-input-columns-column"
        type="number"
        value={envMapRotation[2]}
        onChange={(e) => handleEnvMap(e, 2)}
      />
    </div>
  );
}
