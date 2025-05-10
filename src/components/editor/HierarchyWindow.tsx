import { useEffect, useRef } from 'react';
import { useEditorContext } from '../../hooks/useEditorContext';
import VisibilityOutlined  from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import { SceneObject } from '../../types/SceneObject';

function HierarchyWindow() {
  const { sceneObjects, focused, focus } = useEditorContext();
  const parentRef = useRef<HTMLDivElement>(null);

  const handleClick = (object:SceneObject) => {
    if(object.ref!.visible) {
      object.ref!.visible = false;
    }else {
      object.ref!.visible = true;
    }
  }

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
      {Object.entries(sceneObjects).map(([uuid, object]) => (
        <div
          key={uuid}
          className="hierarchy-window__item"
          onClick={() => focus(uuid)}
          style={{ background: focused == uuid ? '#555' : '' }}
        >
          {object.name}
          <div className="buttonContainer"
            style={{display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end'}}
          >
            <button 
              style={{ background: 'none', border: 'none', padding: '0px', margin: '0px' }}
              onClick={() => handleClick(object)}
            >
              {object.ref && object.ref!.visible ? (
                <VisibilityOutlined style={{ color: 'white' }} />
              ) : (
                <VisibilityOffOutlinedIcon style={{ color: 'white' }} />
              )}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default HierarchyWindow;
