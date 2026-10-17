import useEntities from '@/hooks/useEntities';
import { RenderSystem } from './RenderSystem';

export default function RenderSystemWrapper() {
  const entities = useEntities();

  return entities.map((entity) => (
    <RenderSystem entity={entity} key={entity} />
  ));
}
