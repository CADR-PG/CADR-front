import { RapierRigidBody } from '@react-three/rapier';
import { Entity } from './Entity';
import { ECS } from './ECS';
import RBody from './components/RigidBody';

type Waiter = (ref: RapierRigidBody) => void;
const waiters = new Map<Entity, Set<Waiter>>();

export function notifyBodyReady(entity: Entity, body: RapierRigidBody) {
  const set = waiters.get(entity);
  if (!set) return;
  waiters.delete(entity);
  for (const resolve of set) resolve(body);
}

export function waitForBody(
  entity: Entity,
  timeoutMs = 3000,
): Promise<RapierRigidBody> {
  const existing = ECS.instance.entityManager.getComponent(RBody, entity)?.ref;
  if (existing && existing.isValid()) return Promise.resolve(existing);

  return new Promise((resolve, reject) => {
    const set = waiters.get(entity) ?? new Set<Waiter>();
    waiters.set(entity, set);

    const timer = setTimeout(() => {
      set.delete(waiter);
      reject(new Error('RigidBody not mounted withing the time limit'));
    }, timeoutMs);

    const waiter: Waiter = (body) => {
      clearTimeout(timer);
      resolve(body);
    };

    set.add(waiter);
  });
}

export function clearBodyWaiters() {
  waiters.clear();
}
