import { useEffect, useRef } from 'react';
import { useEditorContext } from '../../hooks/useEditorContext';
import VisibilityOutlined from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import Name from '../../engine/components/Name';
import useEntityManager from '../../hooks/useEntityManager';
import Invisible from '../../engine/components/Invisible';
import { Entity } from '../../engine/Entity';
import { ECS } from '../../engine/ECS';

function HierarchyWindow() {
  const em = useEntityManager();
  const { focused, focus } = useEditorContext();
  const parentRef = useRef<HTMLDivElement>(null);

  const handleClick = (entity: Entity) => {
    if (!em.has(Invisible, entity)) {
      ECS.instance.entityManager.addComponent(new Invisible(), entity);
    } else {
      ECS.instance.entityManager.removeComponent(Invisible, entity);
    }
  };

  // TODO: make it more generic and extract it to a hook
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const isInsideParent = parentRef.current?.contains(event.target as Node);
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
    <div className="hierarchy-window" ref={parentRef}>
      <h3>Hierarchy</h3>
      {em.getEntities().map((entity) => (
        <div
          key={entity}
          className="hierarchy-window__item"
          onClick={() => focus(entity)}
          style={{ background: focused == entity ? '#555' : '' }}
        >
          {em.getComponent(Name, entity)?.displayName || entity}
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
        </div>
      ))}
    </div>
  );
}

export default HierarchyWindow;
