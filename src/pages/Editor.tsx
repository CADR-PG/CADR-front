import { useEffect, useState } from 'react';
import { Allotment } from 'allotment';
import CanvasController from '../components/editor/CanvasController';
import HierarchyWindow from '../components/editor/HierarchyWindow';
import ProjectWindow from '../components/editor/ProjectWindow';
import InspectorWindow from '../components/editor/InspectorWindow';
import Navigation from '../components/editor/Navigation';
import { SceneObjects } from '../types/SceneObject';
import { EditorContextValues, EditorContext } from '../data/EditorContext';
import KeyboardController from '../components/editor/KeyboardController';
import useLoadScene from '../hooks/useLoadScene';
import { useParams } from 'react-router-dom';
import * as THREE from 'three';
import { parseScene } from '../utils';
import SceneData from '../types/SaveSceneData';
import { ECS } from '../engine/ECS';

function Editor() {
  const [sceneObjects, setSceneObjects] = useState<SceneObjects>({});
  const [focused, focus] = useState<string | null>(null);
  const { uuid } = useParams();
  const { data, isError } = useLoadScene(uuid!);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    // const loader = new THREE.ObjectLoader();
    if (data) {
      // TODO: xdd
      // loader.parse(data.data.data, (obj) => setSceneObjects(parseScene(obj)));
      //focus(null);
      const json = data.data.data;
      ECS.instance.setEntities(json.entities);
      ECS.instance.setComponents(json.components);
    }
    if (isError) {
      // setSceneObjects({});
    }
  }, [data, isError]);

  const contextValue: EditorContextValues = {
    sceneObjects,
    setSceneObjects,
    focused,
    focus,
    running,
    setRunning,
  };

  return (
    <EditorContext.Provider value={contextValue}>
      <div className="editor-hld">
        <Navigation />
        <KeyboardController>
          <div className="editor-section">
            <Allotment vertical snap={true}>
              <Allotment.Pane minSize={300} preferredSize={1000}>
                <Allotment vertical={false} separator={true} snap={true}>
                  <Allotment.Pane
                    minSize={screen.width / 6}
                    preferredSize={screen.width / 5}
                  >
                    <HierarchyWindow />
                  </Allotment.Pane>
                  <Allotment.Pane
                    minSize={screen.width / 3}
                    preferredSize={screen.width / 3}
                    snap={false}
                  >
                    <CanvasController />
                  </Allotment.Pane>
                  <Allotment.Pane
                    minSize={screen.width / 6}
                    preferredSize={screen.width / 5}
                  >
                    <InspectorWindow />
                  </Allotment.Pane>
                </Allotment>
              </Allotment.Pane>
              <Allotment.Pane minSize={150} preferredSize={screen.height / 4}>
                <ProjectWindow />
              </Allotment.Pane>
            </Allotment>
          </div>
        </KeyboardController>
      </div>
    </EditorContext.Provider>
  );
}

export default Editor;
