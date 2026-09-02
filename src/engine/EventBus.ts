type EventMessageType = 'placeholder';

interface EventMessageData {
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
  }

  publish(event: EventMessage<EventMessageData>) {
    const callbacks = this.subscribers[event.data.type];

    if (!callbacks) return;

    for (let callback of callbacks) {
      callback(event.data);
    }
  }
}
