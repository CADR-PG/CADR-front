import { JSX, useState, RefObject } from 'react';
import Split from 'react-split';
import CanvasController from '../components/editor/CanvasController';
import HierarchyWindow from '../components/editor/HierarchyWindow';
import ProjectWindow from '../components/editor/ProjectWindow';
import InspectorWindow from '../components/editor/InspectorWindow';
import Navigation from '../components/editor/Navigation';
import * as THREE from 'three';

function Editor() {
  const [objects, setObjects] = useState<JSX.Element[]>([]);
  const [ref, setRef] = useState<RefObject<THREE.Mesh> | null>();

  const pushMesh = (mesh: JSX.Element) => {
    setObjects((prev) => [...prev, mesh]);
  };

  return (
    <div className="editor-hld">
      <Navigation addMesh={pushMesh} setRef={setRef} />
      <div className="editor-section">
        <Split className="editor" direction="vertical" minSize={150}>
          <Split
            direction="horizontal"
            sizes={[30, 70]}
            minSize={[200, 400]}
            className="editor-split"
          >
            <HierarchyWindow objects={objects} />
            <Split
              direction="horizontal"
              sizes={[70, 30]}
              minSize={[400, 250]}
              className="editor-split"
            >
              <CanvasController
                objects={objects}
                currentRef={ref}
                setRef={setRef}
              />
              <InspectorWindow />
            </Split>
          </Split>
          <ProjectWindow />
        </Split>
      </div>
    </div>
  );
}

export default Editor;
