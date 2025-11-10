import { useSnapshot } from 'valtio';
import { ECS } from '../engine/ECS';

export default function useEntityManager() {
  return useSnapshot(ECS.instance.entityManager);
}
