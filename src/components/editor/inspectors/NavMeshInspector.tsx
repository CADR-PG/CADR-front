import NavMesh from '@/engine/components/NavMesh';
import InspectorProps from '@/types/InspectorProps';
import InspectorTemplate from './InspectorTemplate';
import NavMeshDropArea from './NavMeshDropArea';

export default function NavMeshInspector({ entity }: InspectorProps) {
  return (
    <InspectorTemplate
      entity={entity}
      componentType={NavMesh}
      specialRender={(key) => {
        switch (key) {
          case 'source':
            return <NavMeshDropArea entity={entity} />;
          case 'mesh':
            return null;
          default:
            return undefined;
        }
      }}
    />
  );
}
