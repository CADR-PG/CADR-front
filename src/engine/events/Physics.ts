import { CollisionPayload, ContactForcePayload } from '@react-three/rapier';
import { EventMessageData } from '../EventBus';

export interface CollisionEnter extends EventMessageData {
  type: 'collisionEnter';
  payload: CollisionPayload;
}

export interface CollisionExit extends EventMessageData {
  type: 'collisionExit';
  payload: CollisionPayload;
}

export interface IntersectEnter extends EventMessageData {
  type: 'intersectEnter';
  payload: CollisionPayload;
}

export interface IntersectExit extends EventMessageData {
  type: 'intersectExit';
  payload: CollisionPayload;
}

export interface ContactForce extends EventMessageData {
  type: 'contactForce';
  payload: ContactForcePayload;
}
