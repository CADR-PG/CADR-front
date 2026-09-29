import { playAnimation, stopAnimation } from '@/engine/Animation';
import { ECS } from '@/engine/ECS';
import { useAnimationStore } from '@/stores/animationStore';
import InspectorProps from '@/types/InspectorProps';
import { Button } from '@mui/material';

export default function AnimationsInspector({ entity }: InspectorProps) {
  const animations = ECS.instance.entityManager.animations[entity];
  const playing = useAnimationStore((s) => s.playing[entity]);

  return animations ? (
    <div>
      {Object.keys(animations).map((animation) => {
        return (
          <div
            key={animation}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div>{animation}</div>
            <Button
              onClick={() => {
                console.log(animations[animation]);
                if (playing === animation) {
                  stopAnimation(animation, entity);
                } else {
                  playAnimation(animation, entity);
                }
              }}
            >
              {playing === animation ? 'Stop' : 'Play'}
            </Button>
          </div>
        );
      })}
    </div>
  ) : null;
}
