import { useRef } from 'react';
import useEntityManager from '../../hooks/useEntityManager';
import HierarchyEntity from './HierarchyEntity';
import Parent from '@/engine/components/Parent';
import { useDrop } from 'react-dnd';
import EntityDragObject from '@/types/EntityDragObject';
import { DndTypes } from '@/types/DndTypes';
import { setParent } from '@/engine/Hierarchy';
import { AssetsFile } from '@/types/Assets';
import { loadExternalScene } from '@/engine/Scene';
import { useParams } from 'react-router-dom';

function isEntity(
  item: EntityDragObject | AssetsFile,
): item is EntityDragObject {
  if ('child' in item) return true;
  return false;
}

function HierarchyWindow() {
  const em = useEntityManager();
  const { uuid } = useParams();
  const parentRef = useRef<HTMLDivElement>(null);
  const [_, drop] = useDrop(() => ({
    accept: [DndTypes.ENTITY, DndTypes.FILE],
    drop: (item: EntityDragObject | AssetsFile, _monitor) => {
      if (isEntity(item)) {
        setParent(null, item.child);
      } else {
        loadExternalScene(uuid!, item);
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  }));

  return (
    <div className="hierarchy-window" ref={parentRef}>
      <h3>Hierarchy</h3>
      <div style={{ paddingLeft: '18px' }}>
        <b
          ref={(node) => {
            drop(node);
          }}
          style={{ marginLeft: '-5px' }}
        >
          Scene
        </b>
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
      </div>
    </div>
  );
}

export default HierarchyWindow;
