import { useAnimationStore } from '@/stores/animationStore';
import { ECS } from './ECS';
import { Entity } from './Entity';
import { LoopOnce } from 'three';

export function playAnimation(name: string, entity: Entity) {
  const anims = ECS.instance.entityManager.animations[entity];
  Object.values(anims).forEach((a) => a?.stop());
  anims[name]?.setLoop(LoopOnce, 1);
  anims[name]?.reset().play();
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
