import React, { RefObject, useEffect, useRef } from 'react';
import { useEditorContext } from '../../hooks/useEditorContext';

function HierarchyWindow() {
  const { sceneObjects, focused, focus } = useEditorContext();
  const parentRef = useRef<HTMLDivElement>(null);

  // TODO: make it more generic and extract it to a hook
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const isInsideParent = parentRef.current?.contains(event.target as Node);
      // TODO: this is kinda stupid, but `eventListener` gets called before `onClick`
      // so on a valid object click it will override null
      if (isInsideParent) focus(null);
    }

    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [])
  
  return (
    <div className="hierarchy-window" ref={parentRef}>
      <h3>Hierarchy</h3>
      {Object.entries(sceneObjects).map(([uuid, object]) => (
        <div
          key={uuid}
          className="hierarchy-window__item"
          onClick={() => focus(uuid)}
          style={{background: focused == uuid ?  "#555" : ""}}
        >
          {object.geometryType}
        </div>
      ))}
    </div>
  );
}

export default HierarchyWindow;
