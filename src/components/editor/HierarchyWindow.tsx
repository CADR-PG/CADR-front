import { useEffect, useRef } from 'react';
import { useEditorContext } from '../../hooks/useEditorContext';
import VisibilityOutlined from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import { SceneObject } from '../../types/SceneObject';
import { ECS } from '../../engine/ECS';
import Name from '../../engine/components/Name';

function HierarchyWindow() {
  const { focused, focus } = useEditorContext();
  const parentRef = useRef<HTMLDivElement>(null);

  const handleClick = (object: SceneObject) => {
    if (object.ref!.visible) {
      object.ref!.visible = false;
    } else {
      object.ref!.visible = true;
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
      {ECS.instance.getEntities().map((entity) => (
        <div
          key={entity}
          className="hierarchy-window__item"
          onClick={() => focus(entity)}
          style={{ background: focused == entity ? '#555' : '' }}
        >
          {ECS.instance.getComponent(Name, entity)?.displayName || entity}
          {
            // <div className="buttonContainer">
            //   <button
            //     className="visibilityButton"
            //     onClick={() => handleClick(object)}
            //   >
            //     {object.ref && object.ref!.visible ? (
            //       <VisibilityOutlined />
            //     ) : (
            //       <VisibilityOffOutlinedIcon />
            //     )}
            //   </button>
            // </div>
          }
        </div>
      ))}
    </div>
  );
}

export default HierarchyWindow;
