import useEntityManager from '@/hooks/useEntityManager';
import Fog from '@/engine/components/Fog';
import { Entity } from '@/engine/Entity';

interface FogControllerProps {
  entity: Entity;
}

export default function FogController({ entity }: FogControllerProps) {
  const em = useEntityManager();
  const fog = em.getComponent(Fog, entity);
  if (!fog) return null;

  const { color, near, far } = fog.data;
  return <fog attach="fog" args={[color, near, far]} />;
}
