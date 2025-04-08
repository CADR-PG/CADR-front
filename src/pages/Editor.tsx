
import { JSX, useState, RefObject } from 'react';
import Split from 'react-split';
import CanvasController from '../editor/CanvasController';
import HierarchyWindow from '../editor/Components/HierarchyWindow';
import ProjectWindow from '../editor/Components/ProjectWindow';
import InspectorWindow from '../editor/Components/InspectorWindow';
import Toolbar from '../editor/ToolBar';
import * as THREE from 'three';

function Editor() {
  const [objects, setObjects] = useState<JSX.Element[]>([]);
  const [ref, setRef] = useState<RefObject<THREE.Mesh> | null>();

  const pushMesh = (mesh: JSX.Element) => {
    setObjects((prev) => [...prev, mesh]);
  };

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Toolbar addMesh={pushMesh} setRef={setRef} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Split
          className="editor"
          direction="vertical"
          sizes={[80, 20]}
          minSize={150}
          style={{ display: 'flex', flexDirection: 'column', height: '100%' }}
        >
          <Split
            direction="horizontal"
            sizes={[30, 70]}
            minSize={[200, 400]}
            style={{ display: 'flex', height: '100%' }}
          >
            <HierarchyWindow />
            <Split
              direction="horizontal"
              sizes={[70, 30]}
              minSize={[400, 250]}
              style={{ display: 'flex', height: '100%' }}
            >
              <CanvasController objects={objects} currentRef={ref} setRef={setRef} />
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