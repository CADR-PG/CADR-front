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
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { sdk } from '@/data/Sdk';
import { stopAllAnimations } from '@/engine/Animation';
import { requestFileDownload } from '@/api/client';
import { normalizeUrl } from '@/engine/components/helpers/material';

function Editor() {
  const [focused, focus] = useState<string | null>(null);
  const [hovered, hover] = useState<string | null>(null);
  const [dragged, drag] = useState<boolean>(false);
  const [gDragged, gDrag] = useState<boolean>(false);
  const { uuid } = useParams();
  const { data, isError } = useLoadScene(uuid!);
  const [running, setRunning] = useState(false);
  const [editingMode, selectMode] = useState<EditingMode>('translate');
  const [dnd, setDnd] = useState<string | null>(null);
  const [scene, setScene] = useState<string | null>(null);
  const [scenes, setScenes] = useState<string[]>([]);

  useEffect(() => {
    async function load() {
      if (data) {
        // TODO: xdd
        const json = data.data.data;
        console.log('id', json.currentScene);
        const scene = await requestFileDownload(uuid!, json.currentScene);
        console.log(scene.data.downloadUrl);
        const text = await fetch(normalizeUrl(scene));
        const body = await text.json();
        console.log('text', body);
        ECS.instance.systems = [];
        await ECS.instance.entityManager.loadComponents(body, uuid!, sdk);
        ECS.instance.entityManager.setScene(body);
      }
      if (isError) {
        ECS.instance.entityManager.setScene({});
      }
    }
    load();
  }, [data, isError]);

  const startstop = (newState: boolean) => {
    if (!running && newState) {
      ECS.instance.entityManager.copyScene();
      // TODO: we should probably create some sort of callback/event
      // for when scene transforms from editor to game mode
      stopAllAnimations();
    }
    if (running && !newState) {
      ECS.instance.entityManager.restoreScene();
    }

    setRunning(newState);
  };

  const contextValue: EditorContextValues = {
    focused,
    focus,
    running,
    setRunning: startstop,
    editingMode,
    selectMode,
    hovered,
    hover,
    drag,
    dragged,
    gDrag,
    gDragged,
    dnd,
    setDnd,
    scene,
    setScene,
    scenes,
    setScenes,
  };

  return (
    <EditorContext.Provider value={contextValue}>
      <DndProvider backend={HTML5Backend}>
        <div className="editor-hld">
          <Navigation />
          <KeyboardController>
            <div className="editor-section">
              <Allotment vertical snap={true}>
                <Allotment vertical={false} separator={true} snap={true}>
                  <Allotment.Pane preferredSize={500}>
                    <Allotment
                      vertical={true}
                      separator={true}
                      minSize={300}
                      snap
                    >
                      <Allotment.Pane
                        minSize={screen.width / 6}
                        preferredSize={300}
                      >
                        <HierarchyWindow />
                      </Allotment.Pane>
                      <Allotment.Pane
                        minSize={screen.width / 6}
                        preferredSize={300}
                      >
                        <div style={{ height: '100%', overflow: 'auto' }}>
                          <ProjectWindow />
                        </div>
                      </Allotment.Pane>
                    </Allotment>
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
              </Allotment>
            </div>
          </KeyboardController>
        </div>
      </DndProvider>
    </EditorContext.Provider>
  );
}

export default Editor;
