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
import Parent from '@/engine/components/Parent';

interface HierarchyEntityProps {
  entity: Entity;
}

interface EntityDragObject {
  child: Entity;
}

export default function HierarchyEntity({ entity }: HierarchyEntityProps) {
  const em = useEntityManager();
  const { focused, focus } = useEditorContext();

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
        if (item.child === entity) return;

        // ECS.instance.entityManager
        //   .getComponent(Children, item.child)
        //   ?.children?.forEach((child) => {
        //     const parent = ECS.instance.entityManager.getComponent(
        //       Parent,
        //       child,
        //     );
        //     if (!parent || !parent.entity) return;
        //
        //     parent.entity = ECS.instance.entityManager.getComponent(
        //       Parent,
        //       item.child,
        //     )?.entity;
        //   });

        ECS.instance.entityManager.removeComponent(Parent, item.child);
        ECS.instance.entityManager.addComponent(
          new Parent(entity, item.child),
          item.child,
        );
        console.log(ECS.instance.entityManager.getComponents(entity));
        console.log(ECS.instance.entityManager.getComponents(item.child));
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
        onClick={() => focus(entity)}
        style={{
          background: focused == entity ? '#555' : '',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div
          ref={(node) => {
            drag(node);
          }}
        >
          {em.getComponent(Name, entity)?.displayName || entity}
        </div>
        <div className="buttonContainer">
          <button
            className="visibilityButton"
            onClick={() => handleClick(entity)}
          >
            {!em.has(Invisible, entity) ? (
              <VisibilityOutlined />
            ) : (
              <VisibilityOffOutlinedIcon />
            )}
          </button>
        </div>

        <div style={{ paddingLeft: '32px' }}>
          {em.getComponent(Children, entity)?.children.map((child) => (
            <div>
              <HierarchyEntity entity={child} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
