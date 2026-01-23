import { RootState } from '@react-three/fiber';
import Name from '../components/Name';
import Transform from '../components/Transform';
import { ECS } from '../ECS';
import { Entity } from '../Entity';
import { System } from '../System';
import * as THREE from 'three';

export default class TestSystem extends System {
  timer: THREE;

  start() {
    console.log('init');
  }

  update(entities: Entity[], state: RootState, delta: number): void {
    for (const entity of entities) {
      const t = ECS.instance.entityManager.getComponent(Transform, entity);
      if (!t) continue;
      console.log(state.clock.getElapsedTime());
      t.position[1] += Math.sin(state.clock.getElapsedTime()) * 3 * delta;
    }
  }
}

ECS.instance.registerSystem(new TestSystem(Name, Transform));
