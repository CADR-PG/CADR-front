import GLTF from '../../../engine/components/GLTF';
import { Entity } from '../../../engine/Entity';
import InspectorTemplate from './InspectorTemplate';
import ModelDropArea from './ModelDropArea';

interface GLTFInspectorProps {
  entity: Entity;
}

export default function GLTFInspector({ entity }: GLTFInspectorProps) {
  return (
    <InspectorTemplate
      entity={entity}
      componentType={GLTF}
      specialRender={(key) => {
        switch (key) {
          case 'source':
            return <ModelDropArea entity={entity} />;
          default:
            return undefined;
        }
      }}
    />
  );
}
