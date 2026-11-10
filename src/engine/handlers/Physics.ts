import {
  CollisionEnterPayload,
  CollisionPayload,
  ContactForcePayload,
} from '@react-three/rapier';
import { EventBus } from '../EventBus';
import {
  CollisionEnter,
  CollisionExit,
  ContactForce,
  IntersectEnter,
  IntersectExit,
} from '../events/Physics';

const physicsHandlers = {
  onCollisionEnter: (payload: CollisionEnterPayload) => {
    console.log('COLLISION');
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

  onIntersectionEnter: (payload: CollisionPayload) => {
    console.log('INTERSECT');
    EventBus.instance.publish<IntersectEnter>({
      data: {
        type: 'intersectEnter',
        payload,
      },
    });
  },

  onIntersectionExit: (payload: CollisionPayload) => {
    EventBus.instance.publish<IntersectExit>({
      data: {
        type: 'intersectExit',
        payload,
      },
    });
  },

  onContactForce: (payload: ContactForcePayload) => {
    EventBus.instance.publish<ContactForce>({
      data: {
        type: 'contactForce',
        payload,
      },
    });
  },
};

export default physicsHandlers;
