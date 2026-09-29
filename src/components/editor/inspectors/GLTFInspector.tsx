import GLTF from '../../../engine/components/GLTF';
import InspectorProps from '../../../types/InspectorProps';
import AnimationsInspector from './AnimationsInspector';
import InspectorTemplate from './InspectorTemplate';
import ModelDropArea from './ModelDropArea';

export default function GLTFInspector({ entity }: InspectorProps) {
  return (
    <InspectorTemplate
      entity={entity}
      componentType={GLTF}
      specialRender={(key) => {
        console.log(key);
        switch (key) {
          case 'source':
            return <ModelDropArea entity={entity} />;
          case 'animations':
            return <AnimationsInspector entity={entity} />;
          default:
            return undefined;
        }
      }}
    />
  );
}
