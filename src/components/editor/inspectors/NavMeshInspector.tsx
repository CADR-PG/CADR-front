import NavMesh from '@/engine/components/NavMesh';
import useEntityManager from '@/hooks/useEntityManager';
import InspectorProps from '@/types/InspectorProps';
import InspectorTemplate from './InspectorTemplate';
import NavMeshDropArea from './NavMeshDropArea';

export default function NavMeshInspector({ entity }: InspectorProps) {
  const em = useEntityManager();
  const navMesh = em.getComponent(NavMesh, entity);

  if (!navMesh) return null;

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
