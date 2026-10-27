import { useRef } from 'react';
import useEntityManager from '../../hooks/useEntityManager';
import HierarchyEntity from './HierarchyEntity';
import Parent from '@/engine/components/Parent';
import { Button } from '@mui/material';
import { makeCreateEntityCommand } from '@/engine/Command';
import { ECS } from '@/engine/ECS';
import Name from '@/engine/components/Name';
import Transform from '@/engine/components/Transform';

function HierarchyWindow() {
  const em = useEntityManager();
  const parentRef = useRef<HTMLDivElement>(null);

  const createRoot = () => {
    const command = makeCreateEntityCommand(null, null, (entity) => {
      ECS.instance.entityManager.addComponent(new Name("root"), entity);
      ECS.instance.entityManager.addComponent(new Transform(), entity);
    })
    ECS.instance.entityManager.pushCommand(command);
  }

  return (
    <div className="hierarchy-window" ref={parentRef}>
      <h3>Hierarchy</h3>
      <div className="hierarchy-window-content">
        <b className="hierarchy-window-content-title">Scene</b>
        {em.getEntities().length > 0 ? (
          <ul className="tree">
            {em
              .getEntities()
              .filter(
                (entity) =>
                  !em.getComponent(Parent, entity) ||
                  !em.getComponent(Parent, entity)?.entity,
              )
              .map((entity) => (
                <HierarchyEntity
                  parent={parentRef.current}
                  entity={entity}
                  key={entity}
                />
              ))}
          </ul>
        ) : (
          <div className="hierarchy-window-content-create-button">
            <Button variant="contained" onClick={() => createRoot()}>Create root</Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default HierarchyWindow;
