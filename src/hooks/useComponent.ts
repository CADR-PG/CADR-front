import { proxy, useSnapshot } from 'valtio';
import { ComponentType } from '../engine/Component';
import { Entity } from '../engine/Entity';
import { ECS } from '../engine/ECS';

function useComponent(component: ComponentType, entity: Entity) {
  const c = ECS.instance.entityManager.getComponent(component, entity);
  const entities = useSnapshot(c ?? proxy({}));
}
