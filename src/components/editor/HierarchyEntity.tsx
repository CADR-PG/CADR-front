import Invisible from '@/engine/components/Invisible';
import Name from '@/engine/components/Name';
import { ECS } from '@/engine/ECS';
import { Entity } from '@/engine/Entity';
import { useEditorContext } from '@/hooks/useEditorContext';
import useEntityManager from '@/hooks/useEntityManager';
import { DndTypes } from '@/types/DndTypes';
import { useDrag, useDrop } from 'react-dnd';
import VisibilityOutlined from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import Children from '@/engine/components/Children';
import { setParent } from '@/engine/Hierarchy';
import { Collapse, IconButton } from '@mui/material';
import { useEffect, useState } from 'react';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import EntityDragObject from '@/types/EntityDragObject';

interface HierarchyEntityProps {
  entity: Entity;
  parent: HTMLDivElement | null;
}

export default function HierarchyEntity({
  entity,
  parent,
}: HierarchyEntityProps) {
  const em = useEntityManager();
  const children = em.getComponent(Children, entity);
  const { focused, focus, dnd, setDnd } = useEditorContext();
  const [open, setOpen] = useState(true);

  const [, drag] = useDrag(
    () => ({
      type: DndTypes.ENTITY,
      item: { child: entity } as EntityDragObject,
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
      end(draggedItem, _monitor) {
        setDnd(null);
        focus(draggedItem.child);
      },
    }),
    [entity],
  );

  const [_, drop] = useDrop(
    () => ({
      accept: DndTypes.ENTITY,
      drop: (item: EntityDragObject, _monitor) => {
        setParent(entity, item.child);
      },
      hover(_item, monitor) {
        if (monitor.isOver() && monitor.canDrop()) {
          setDnd(entity);
        }
      },
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
        canDrop: !!monitor.canDrop(),
      }),
    }),
    [entity, dnd],
  );

  const handleClick = (entity: Entity) => {
    if (!em.has(Invisible, entity)) {
      ECS.instance.entityManager.addComponent(new Invisible(), entity);
    } else {
      ECS.instance.entityManager.removeComponent(Invisible, entity);
    }
  };

  // TODO: make it more generic and extract it to a hook
  // TODO2: fuck does it do???
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const isInsideParent = parent?.contains(event.target as Node);
      // TODO: this is kinda stupid, but `eventListener` gets called before `onClick`
      // so on a valid object click it will override null
      if (isInsideParent) focus(null);
    };

    document.addEventListener('mousedown', handleClick);
    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, [focus]);

  return (
    <li>
      <div
        ref={(node) => {
          drop(node);
        }}
        onClick={() => {
          focus(entity);
        }}
        style={{
          background: focused == entity ? '#bbb' : '',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
          <div
            ref={(node) => {
              drag(node);
            }}
            className={dnd === entity ? 'underline-hover' : ''}
            style={{ width: '100%' }}
          >
            {em.getComponent(Name, entity)?.displayName || entity}
          </div>

          {children && children.children.length ? (
            <IconButton
              className="visibilityButton"
              onClick={() => {
                setOpen((prev) => !prev);
              }}
            >
              {open ? <ExpandLess /> : <ExpandMore />}
            </IconButton>
          ) : null}
        </div>

        <IconButton
          className="visibilityButton"
          onClick={() => handleClick(entity)}
        >
          {!em.has(Invisible, entity) ? (
            <VisibilityOutlined />
          ) : (
            <VisibilityOffOutlinedIcon />
          )}
        </IconButton>
      </div>

      <Collapse in={open}>
        <ul className="tree">
          {em
            .getComponent(Children, entity)
            ?.children.map((child, i) => (
              <HierarchyEntity parent={parent} key={i} entity={child} />
            ))}
        </ul>
      </Collapse>
    </li>
  );
}
