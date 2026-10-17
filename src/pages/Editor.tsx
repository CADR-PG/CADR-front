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
import { stopAllAnimations } from '@/engine/Animation';
import SceneTabs from '@/components/SceneTabs';
import useEntityManager from '@/hooks/useEntityManager';
import { Camera } from 'three';
import { loadScene } from '@/engine/Scene';
import { Asset, useEditorSettingsStore } from '@/stores/editorSettingsStore';
import { GAME_SCENE } from '@/engine/EntityManager';
import { AssetsFile } from '@/types/Assets';

function isScene(
  asset: Asset,
): asset is Omit<
  AssetsFile,
  'sizeInBytes' | 'createdAt' | 'lastModifiedAt' | 'directories' | 'files'
> {
  return asset.id !== null && asset.id !== undefined;
}

function Editor() {
  const em = useEntityManager();
  const [focused, focus] = useState<string | null>(null);
  const [hovered, hover] = useState<string | null>(null);
  const [dragged, drag] = useState<boolean>(false);
  const [gDragged, gDrag] = useState<boolean>(false);
  const { uuid } = useParams();
  const { data, isError } = useLoadScene(uuid!);
  const [running, setRunning] = useState(false);
  const [editingMode, selectMode] = useState<EditingMode>('translate');
  const [dnd, setDnd] = useState<string | null>(null);
  const [camera, setCamera] = useState<Camera>(null!);
  const { setGame, scenes, game } = useEditorSettingsStore();

  useEffect(() => {
    async function load() {
      if (data) {
        const em = ECS.instance.entityManager;
        // TODO: xdd
        const json = data.data.data;
        json.scenes.forEach(async (scene, i) => {
          if (i > em.scenes.length - 1) {
            em.createScene();
          }
          if (scene && isScene(scene)) {
            try {
              await loadScene(uuid!, scene, i);
            } catch {
              console.error("Couldn't load the scene");
              console.trace();
            }
          }
        });
        em.currentScene = json.currentScene;
        setGame(json.game);
      }
      if (isError) {
        console.error('Something went wrong with scene initialization');
      }
    }
    load();
  }, [data, isError]);

  const startstop = async (newState: boolean, current: boolean | null) => {
    stopAllAnimations();

    const em = ECS.instance.entityManager;
    if (!running && newState) {
      const editorIdx = em.currentScene;
      em.enterGame();

      try {
        if (current) {
          const scene = scenes[editorIdx];
          if (!scene?.id)
            throw new Error('Current scene has no file (unsaved?)');
          await loadScene(
            uuid!,
            {
              id: scene.id,
              name: scene.name!,
              directoryId: scene.directoryId!,
            },
            GAME_SCENE,
          );
        } else {
          if (!game) throw new Error('No main game scene set');
          await loadScene(
            uuid!,
            { id: game, name: 'dummy', directoryId: 'dummy' },
            GAME_SCENE,
          );
        }
      } catch (e) {
        console.error('Failed to start game', e);
        em.exitGame();
        return;
      }

      ECS.instance.isRunning = true;
      setRunning(true);
    }

    if (running && !newState) {
      setRunning(false);
      ECS.instance.isRunning = false;
      em.exitGame();
    }
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
    camera,
    setCamera,
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
                        <div className="project-window-pane">
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
                    <SceneTabs />
                    <CanvasController
                      key={`${em.currentScene} ${em.getScene().id}`}
                    />
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
