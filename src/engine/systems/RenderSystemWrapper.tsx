import useEntities from '@/hooks/useEntities';
import { RenderSystem } from './RenderSystem';
import useEntityManager from '@/hooks/useEntityManager';
import Parent from '../components/Parent';

export default function RenderSystemWrapper() {
  const entities = useEntities();
  const em = useEntityManager();

  return entities.map((entity) => <RenderSystem entity={entity} />);
}
