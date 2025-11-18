import { Entity } from '../../../engine/Entity';
import { ECS } from '../../../engine/ECS';
import { ChangeEvent } from 'react';
import Material, { MaterialData } from '../../../engine/components/Material';

type WireframeType = 'round' | 'bevel' | 'miter';

interface MaterialWireframeData extends MaterialData {
  parameters: {
    wireframeLinecap: WireframeType;
    wireframeLinejoin: WireframeType;
  };
}

interface MaterialWireframe extends Material {
  data: MaterialWireframeData;
}

interface WireframeProps {
  entity: Entity;
  wireframe: WireframeType;
  wireframeKey: keyof MaterialWireframeData['parameters'];
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

  const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    materialWrite.data.parameters[wireframeKey] = e.currentTarget
      .value as WireframeType;
  };

  return (
    <select defaultValue={wireframe} onChange={(e) => handleSelect(e)}>
      <option value="round">round</option>
      <option value="bevel">bevel</option>
      <option value="miter">miter</option>
    </select>
  );
}
