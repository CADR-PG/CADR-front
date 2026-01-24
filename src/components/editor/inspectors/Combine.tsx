import { MenuItem, Select, SelectChangeEvent } from '@mui/material';
import {
  AddOperation,
  Combine as CombineType,
  MixOperation,
  MultiplyOperation,
} from 'three';
import { Entity } from '../../../engine/Entity';
import { ECS } from '../../../engine/ECS';
import Material, { MaterialData } from '../../../engine/components/Material';

interface MaterialCombineData extends MaterialData {
  combine: CombineType;
}

interface MaterialCombine extends Material {
  data: MaterialCombineData;
}

interface CombineProps {
  entity: Entity;
  value: CombineType;
}

export default function Combine({ entity, value }: CombineProps) {
  const materialWrite = ECS.instance.entityManager.getComponent(
    Material,
    entity,
  ) as MaterialCombine;

  if (!materialWrite) return;

  const handleSelect = (e: SelectChangeEvent) => {
    if (!materialWrite) return;

    materialWrite.data.combine = Number(e.target.value) as CombineType;
  };

  return (
    // NOTE(m1k53r): `select` needs to have values in strings for some fucking
    // reason idk bruh.
    <Select onChange={handleSelect} value={value.toString()} size="small">
      <MenuItem value={MultiplyOperation}>MultiplyOperation</MenuItem>
      <MenuItem value={MixOperation}>MixOperation</MenuItem>
      <MenuItem value={AddOperation}>AddOperation</MenuItem>
    </Select>
  );
}
