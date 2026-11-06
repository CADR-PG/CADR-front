export type EventMessageType =
  | 'collisionEnter'
  | 'collisionExit'
  | 'intersectEnter'
  | 'intersectExit'
  | 'contactForce'
  | 'animationFinished';

export interface EventMessageData {
  type: EventMessageType;
}

interface EventMessage<T extends EventMessageData> {
  data: T;
}

type Subscribers = Partial<
  Record<EventMessageType, ((data: EventMessageData) => void)[]>
>;

export class EventBus {
  static #instance: EventBus;
  subscribers: Subscribers = {};

  public static get instance(): EventBus {
    if (!EventBus.#instance) {
      EventBus.#instance = new EventBus();
    }
    return EventBus.#instance;
  }

  subscribe(
    event: EventMessageType,
    callback: (data: EventMessageData) => void,
  ) {
    if (!this.subscribers[event]) {
      this.subscribers[event] = [];
    }
    this.subscribers[event]!.push(callback);
    console.log('subscribers', this.subscribers);
  }

  publish<T extends EventMessageData>(event: EventMessage<T>) {
    const callbacks = this.subscribers[event.data.type];

    if (!callbacks) return;

    console.log(callbacks);
    for (let callback of callbacks) {
      try {
        console.log('calling callback', callback);
        callback(event.data);
      } catch (e) {
        console.error(e);
      }
    }
  }
}
