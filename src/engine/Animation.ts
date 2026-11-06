import { useAnimationStore } from '@/stores/animationStore';
import { ECS } from './ECS';
import { Entity } from './Entity';
import { AnimationAction, AnimationActionLoopStyles, LoopOnce } from 'three';

export async function playAnimation(
  name: string,
  entity: Entity,
  loop: AnimationActionLoopStyles = LoopOnce,
) {
  console.log('Anims', ECS.instance.entityManager.animations);
  const anims = await waitForAnimation(entity);
  Object.values(anims).forEach((a) => a?.stop());
  if (loop === LoopOnce) {
    anims[name]?.setLoop(loop, 1);
  } else {
    anims[name]?.setLoop(loop, Infinity);
  }
  anims[name]?.play();
  useAnimationStore.getState().setPlaying(name, entity);
}

export function stopAnimation(name: string, entity: Entity) {
  ECS.instance.entityManager.animations[entity][name]?.stop();
  useAnimationStore.getState().setPlaying(null, entity);
}

export function stopAllAnimations() {
  Object.keys(ECS.instance.entityManager.getScene().entities).forEach(
    (entity) => {
      const anims = ECS.instance.entityManager.animations[entity];
      if (!anims) return;
      Object.values(anims).forEach((a) => a?.stop());
      useAnimationStore.getState().setPlaying(null, entity);
    },
  );
}

type AnimationContainer = { [animation: string]: AnimationAction | null };
type Waiter = (animation: AnimationContainer) => void;
const waiters = new Map<Entity, Set<Waiter>>();

export function notifyAnimationReady(
  entity: Entity,
  animation: AnimationContainer,
) {
  const set = waiters.get(entity);
  if (!set) return;
  waiters.delete(entity);
  for (const resolve of set) resolve(animation);
}

export function waitForAnimation(
  entity: Entity,
  timeoutMs = 3000,
): Promise<AnimationContainer> {
  const existing = ECS.instance.entityManager.animations[entity];
  if (existing) return Promise.resolve(existing);

  return new Promise((resolve, reject) => {
    const set = waiters.get(entity) ?? new Set<Waiter>();
    waiters.set(entity, set);

    const timer = setTimeout(() => {
      set.delete(waiter);
      console.log(
        'No animations for',
        ECS.instance.entityManager.getComponents(entity),
      );
      reject(
        new Error(`Animation not mounted within time limit for ${entity}`),
      );
    }, timeoutMs);

    const waiter: Waiter = (animation) => {
      clearTimeout(timer);
      resolve(animation);
    };

    set.add(waiter);
  });
}
