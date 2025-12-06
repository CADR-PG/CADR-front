import { ChangeEvent } from 'react';
import Material, { MaterialData } from '../../../engine/components/Material';
import { ECS } from '../../../engine/ECS';
import { Entity } from '../../../engine/Entity';
import NumberField from '../../NumberField';

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

  const handleEnvMap = (value: number | null, index: number) => {
    if (value === null) return;

    materialWrite.data.envMapRotation[index] = value;
  };

  return (
    <div className="inspector-input-columns">
      <NumberField
        className="inspector-input-columns-column"
        value={envMapRotation[0]}
        onValueChange={(value) => handleEnvMap(value, 0)}
        size="small"
        label="x"
      />
      <NumberField
        className="inspector-input-columns-column"
        value={envMapRotation[1]}
        onValueChange={(value) => handleEnvMap(value, 1)}
        size="small"
        label="y"
      />
      <NumberField
        className="inspector-input-columns-column"
        value={envMapRotation[2]}
        onValueChange={(value) => handleEnvMap(value, 2)}
        size="small"
        label="z"
      />
    </div>
  );
}
