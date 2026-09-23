import { useRef } from 'react';
import useEntityManager from '../../hooks/useEntityManager';
import HierarchyEntity from './HierarchyEntity';
import Parent from '@/engine/components/Parent';

function HierarchyWindow() {
  const em = useEntityManager();
  const parentRef = useRef<HTMLDivElement>(null);

  return (
    <div className="hierarchy-window" ref={parentRef}>
      <h3>Hierarchy</h3>
      {em
        .getEntities()
        .filter(
          (entity) =>
            !em.getComponent(Parent, entity) ||
            !em.getComponent(Parent, entity)?.entity,
        )
        .map((entity) => (
          <HierarchyEntity entity={entity} key={entity} />
        ))}
    </div>
  );
}

export default HierarchyWindow;
