import GLTF from '../../../engine/components/GLTF';
import InspectorProps from '../../../types/InspectorProps';
import InspectorTemplate from './InspectorTemplate';
import ModelDropArea from './ModelDropArea';

export default function GLTFInspector({ entity }: InspectorProps) {
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
