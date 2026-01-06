import Name from '../components/Name';
import Transform from '../components/Transform';
import { ECS } from '../ECS';
import { Entity } from '../Entity';
import { System } from '../System';

export default class TestSystem extends System {
  update(entities: Entity[], delta: number): void {
    for (let entity of entities) {
      const t = ECS.instance.entityManager.getComponent(Transform, entity);
      if (!t) continue;
      t.rotation[1] += 5 * delta;
    }
  }
}

ECS.instance.registerSystem(new TestSystem(Name, Transform));
