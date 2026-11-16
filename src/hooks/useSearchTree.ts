import { ComponentType } from '@/engine/Component';
import { Entity } from '@/engine/Entity';
import useEntityManager from './useEntityManager';
import Children from '@/engine/components/Children';

export default function useSearchTree(
  component: ComponentType | string,
  entity: Entity,
): Entity | null {
  const em = useEntityManager();

  const search = (
    component: ComponentType | string,
    entity: Entity,
  ): Entity | null => {
    if (typeof component === 'string') {
      if (em.is(component, entity)) {
        return entity;
      }
    } else {
      if (em.has(component, entity)) {
        return entity;
      }
    }

    const children = em.getComponent(Children, entity)?.children;

    if (!children) return null;

    for (const child of children) {
      const result = search(component, child);
      if (result) return result;
    }

    return null;
  };

  return search(component, entity);
}
