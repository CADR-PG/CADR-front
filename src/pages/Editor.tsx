import { useEffect, useState } from 'react';
import { Allotment } from 'allotment';
import CanvasController from '../components/editor/CanvasController';
import HierarchyWindow from '../components/editor/HierarchyWindow';
import ProjectWindow from '../components/editor/ProjectWindow';
import InspectorWindow from '../components/editor/InspectorWindow';
import Navigation from '../components/editor/Navigation';
import { EditorContextValues, EditorContext } from '../data/EditorContext';
import KeyboardController from '../components/editor/KeyboardController';
import useLoadScene from '../hooks/useLoadScene';
import { useParams } from 'react-router-dom';
import { ECS } from '../engine/ECS';
import EditingMode from '../types/EditingMode';
import { Camera } from '../engine/components/Camera';
import Transform from '../engine/components/Transform';
import Name from '../engine/components/Name';

function Editor() {
  const [focused, focus] = useState<string | null>(null);
  const { uuid } = useParams();
  const { data, isError } = useLoadScene(uuid!);
  const [running, setRunning] = useState(false);
  const [editingMode, selectMode] = useState<EditingMode>('translate');

  useEffect(() => {
    if (data) {
      // TODO: xdd
      const json = data.data.data;
      ECS.instance.entityManager.setScene(json);

      const hasCamera = ECS.instance.entityManager
        .getEntities()
        .some((entity) =>
          ECS.instance.entityManager.getComponent(Camera, entity),
        );

      if (!hasCamera) {
        const entity = ECS.instance.entityManager.createEntity();
        ECS.instance.entityManager.addComponent(new Camera(), entity);
        ECS.instance.entityManager.addComponent(new Transform(), entity);
        ECS.instance.entityManager.addComponent(new Name('camera'), entity);
      }
    }
    if (isError) {
      ECS.instance.entityManager.setScene({});
    }
  }, [data, isError]);

  const contextValue: EditorContextValues = {
    focused,
    focus,
    running,
    setRunning,
    editingMode,
    selectMode,
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
