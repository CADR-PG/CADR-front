import { Entity } from '../../../engine/Entity';
import { ECS } from '../../../engine/ECS';
import Material, { MaterialData } from '../../../engine/components/Material';
import { MenuItem, Select, SelectChangeEvent } from '@mui/material';
import WireframeType from '../../../types/WireframeType';

interface MaterialWireframeData extends MaterialData {
  wireframeLinecap: WireframeType;
  wireframeLinejoin: WireframeType;
}

interface MaterialWireframe extends Material {
  data: MaterialWireframeData;
}

interface WireframeProps {
  entity: Entity;
  wireframe: WireframeType;
  wireframeKey: keyof MaterialWireframeData;
}

export default function Wireframe({
  entity,
  wireframe,
  wireframeKey,
}: WireframeProps) {
  const materialWrite = ECS.instance.entityManager.getComponent(
    Material,
    entity,
  ) as MaterialWireframe;

  if (!materialWrite) return;

  const handleSelect = (e: SelectChangeEvent) => {
    materialWrite.data[wireframeKey] = e.target.value as WireframeType;
  };

  return (
    <Select size="small" value={wireframe} onChange={(e) => handleSelect(e)}>
      <MenuItem value="round">round</MenuItem>
      <MenuItem value="bevel">bevel</MenuItem>
      <MenuItem value="miter">miter</MenuItem>
    </Select>
  );
}
