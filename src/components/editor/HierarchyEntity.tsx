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
import { useState } from 'react';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

interface HierarchyEntityProps {
  entity: Entity;
  decoration?: string;
  index?: number;
  siblings?: number;
}

interface EntityDragObject {
  child: Entity;
}

export default function HierarchyEntity({
  entity,
  decoration = '',
  index = 0,
  siblings = 0,
}: HierarchyEntityProps) {
  const em = useEntityManager();
  const children = em.getComponent(Children, entity);
  const { focused, focus } = useEditorContext();
  const [open, setOpen] = useState(true);

  const [, drag] = useDrag(
    () => ({
      type: DndTypes.ENTITY,
      item: { child: entity } as EntityDragObject,
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    }),
    [entity],
  );

  const [{ canDrop }, drop] = useDrop(
    () => ({
      accept: DndTypes.ENTITY,
      drop: (item: EntityDragObject, _monitor) => {
        setParent(entity, item.child);
      },
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
        canDrop: !!monitor.canDrop(),
      }),
    }),
    [entity],
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
  // useEffect(() => {
  //   const handleClick = (event: MouseEvent) => {
  //     const isInsideParent = parent?.contains(event.target as Node);
  //     // TODO: this is kinda stupid, but `eventListener` gets called before `onClick`
  //     // so on a valid object click it will override null
  //     if (isInsideParent) focus(null);
  //   };
  //
  //   document.addEventListener('mousedown', handleClick);
  //   return () => {
  //     document.removeEventListener('mousedown', handleClick);
  //   };
  // }, [focus]);

  return (
    <>
      <div
        ref={(node) => {
          drop(node);
        }}
        className="hierarchy-window__item"
        onClick={() => {
          console.log(`${index} / ${siblings}`);
          focus(entity);
        }}
        style={{
          background: focused == entity ? '#555' : '',
          marginTop: '-7px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {decoration}
          {siblings > 1 && index !== siblings - 1 ? '├' : '└'}
          {false && children && children.children.length ? (
            <IconButton
              onClick={() => {
                setOpen((prev) => !prev);
              }}
            >
              {open ? <ExpandLess /> : <ExpandMore />}
            </IconButton>
          ) : null}
          <div style={{ display: 'flex' }}>
            <div
              ref={(node) => {
                drag(node);
              }}
            >
              {em.getComponent(Name, entity)?.displayName || entity}
            </div>
          </div>
          <div className="buttonContainer">
            {false && (
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
            )}
          </div>
        </div>
      </div>
      <Collapse in={open}>
        <div
          style={
            {
              // paddingLeft: '32px',
            }
          }
        >
          {em.getComponent(Children, entity)?.children.map((child, i) => (
            <div>
              <HierarchyEntity
                entity={child}
                index={i}
                siblings={children!.children.length}
                decoration={
                  siblings > 1 && index !== siblings - 1
                    ? decoration + '│ '
                    : decoration + '..'
                }
              />
            </div>
          ))}
        </div>
      </Collapse>
    </>
  );
}
