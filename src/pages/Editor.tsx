import { useState } from 'react';
import { Allotment } from 'allotment';
import CanvasController from '../components/editor/CanvasController';
import HierarchyWindow from '../components/editor/HierarchyWindow';
import ProjectWindow from '../components/editor/ProjectWindow';
import InspectorWindow from '../components/editor/InspectorWindow';
import Navigation from '../components/editor/Navigation';
import { SceneObjects } from '../types/SceneObject';
import { EditorContextValues, EditorContext } from '../data/EditorContext';

function Editor() {
  const [sceneObjects, setSceneObjects] = useState<SceneObjects>({});
  const [focused, focus] = useState<string | null>(null);

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
          <Allotment vertical snap={true}>
            <Allotment.Pane minSize={300} preferredSize={1000}>
              <Allotment vertical={false} separator={true}>
                <Allotment.Pane minSize={300} preferredSize={screen.width / 3}>
                  <HierarchyWindow />
                </Allotment.Pane>
                <Allotment.Pane minSize={screen.width / 3} preferredSize={screen.width / 3}>
                  <CanvasController />
                </Allotment.Pane>
                <Allotment.Pane minSize={300} preferredSize={screen.width / 3}>
                  <InspectorWindow />
                </Allotment.Pane>
              </Allotment>
            </Allotment.Pane>
            <Allotment.Pane minSize={300}>
              <ProjectWindow />
            </Allotment.Pane>
          </Allotment>
        </div>
      </div>
    </EditorContext.Provider>
  );
}

export default Editor;
