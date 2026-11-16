import { AnimationAction } from 'three';
import { EventMessageData } from '../EventBus';

export interface AnimationFinished extends EventMessageData {
  type: 'animationFinished';
  payload: {
    action: AnimationAction;
    direction: number;
  };
}
