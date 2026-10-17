import {
  CollisionEnterPayload,
  CollisionPayload,
  ContactForcePayload,
} from '@react-three/rapier';
import { EventBus } from '../EventBus';
import {
  CollisionEnter,
  CollisionExit,
  IntersectEnter,
  IntersectExit,
} from '../events/Physics';

const physicsHandlers = {
  onCollisionEnter: (payload: CollisionEnterPayload) => {
    EventBus.instance.publish<CollisionEnter>({
      data: {
        type: 'collisionEnter',
        payload,
      },
    });
  },

  onCollisionExit: (payload: CollisionPayload) => {
    EventBus.instance.publish<CollisionExit>({
      data: {
        type: 'collisionExit',
        payload,
      },
    });
  },

  onIntersectEnter: (payload: CollisionPayload) => {
    EventBus.instance.publish<IntersectEnter>({
      data: {
        type: 'intersectEnter',
        payload,
      },
    });
  },

  onIntersectExit: (payload: CollisionPayload) => {
    EventBus.instance.publish<IntersectExit>({
      data: {
        type: 'intersectExit',
        payload,
      },
    });
  },

  onContactForce: (payload: ContactForcePayload) => {
    EventBus.instance.publish<IntersectExit>({
      data: {
        type: 'intersectExit',
        payload,
      },
    });
  },
};

export default physicsHandlers;
