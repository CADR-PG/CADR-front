import { useState, RefObject, createContext, Dispatch, SetStateAction } from 'react';
import Split from 'react-split';
import CanvasController from '../components/editor/CanvasController';
import HierarchyWindow from '../components/editor/HierarchyWindow';
import ProjectWindow from '../components/editor/ProjectWindow';
import InspectorWindow from '../components/editor/InspectorWindow';
import Navigation from '../components/editor/Navigation';
import * as THREE from 'three';
import SceneObject from '../types/SceneObject';

interface EditorContextValues {
  sceneObjects: SceneObject[];
  setSceneObjects: Dispatch<SetStateAction<SceneObject[]>>;
  focused: RefObject<THREE.Mesh> | null;
  focus: Dispatch<SetStateAction<RefObject<THREE.Mesh> | null>>;
}

export const EditorContext = createContext<EditorContextValues | undefined>(undefined);

function Editor() {
  const [sceneObjects, setSceneObjects] = useState<SceneObject[]>([]);
  const [focused, focus] = useState<RefObject<THREE.Mesh> | null>(null);

  const contextValue: EditorContextValues = {
    sceneObjects,
    setSceneObjects,
    focused,
    focus,
  };

  return (
    <EditorContext.Provider value={contextValue}>
      <div className="editor-hld">
        <Navigation />
        <div className="editor-section">
          <Split className="editor" direction="vertical" minSize={150}>
            <Split
              direction="horizontal"
              sizes={[30, 70]}
              minSize={[200, 400]}
              className="editor-split"
            >
              <HierarchyWindow />
              <Split
                direction="horizontal"
                sizes={[70, 30]}
                minSize={[400, 250]}
                className="editor-split"
              >
                <CanvasController />
                <InspectorWindow />
              </Split>
            </Split>
            <ProjectWindow />
          </Split>
        </div>
      </div>
    </EditorContext.Provider>
  );
}

export default Editor;
