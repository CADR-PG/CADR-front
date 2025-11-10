import { useSnapshot } from 'valtio';
import { ECS } from '../engine/ECS';

export default function useEntities() {
  const entities = useSnapshot(ECS.instance.entityManager.entities);
  return Object.keys(entities);
}
