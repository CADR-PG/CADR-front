import { Camera } from '../components/Camera';
import GenericMesh from '../../components/MeshController';
import useEntities from '../../hooks/useEntities';
import useEntityManager from '../../hooks/useEntityManager';
import CameraController from '../../components/editor/CameraController';

export function RenderSystem() {
  const entities = useEntities();
  const em = useEntityManager();

  return (
    <group position={[0, 0, 0]}>
      {entities.map((entity) => {
        if (em.has(Camera, entity)) {
          console.log('CHUJKURWACOKOLWIEK');
          return <CameraController key={entity} entity={entity} />;
        }
        console.log('cipkakurwacipka');
        return <GenericMesh key={entity} entity={entity} />;
      })}
    </group>
  );
}
