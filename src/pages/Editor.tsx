import { useEffect } from 'react';
import { Allotment } from 'allotment';
import CanvasController from '../components/editor/CanvasController';
import HierarchyWindow from '../components/editor/HierarchyWindow';
import ProjectWindow from '../components/editor/ProjectWindow';
import ConsoleWindow from '../components/editor/ConsoleWindow';
import InspectorWindow from '../components/editor/InspectorWindow';
import Navigation from '../components/editor/Navigation';
import KeyboardController from '../components/editor/KeyboardController';
import useLoadScene from '../hooks/useLoadScene';
import { useParams } from 'react-router-dom';
import { ECS } from '../engine/ECS';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import SceneTabs from '@/components/SceneTabs';
import useEntityManager from '@/hooks/useEntityManager';
import { loadScene } from '@/engine/Scene';
import { Asset, useEditorSettingsStore } from '@/stores/editorSettingsStore';
import { useEditorStore } from '@/stores/editorStore';
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
  const { uuid } = useParams();
  const { data, isError } = useLoadScene(uuid!);
  const { setGame } = useEditorSettingsStore();
  const setProjectId = useEditorStore((s) => s.setProjectId);
  const reset = useEditorStore((s) => s.reset);

  useEffect(() => {
    setProjectId(uuid ?? null);
    return () => reset();
  }, [uuid, setProjectId, reset]);

  useEffect(() => {
    async function load() {
      if (data) {
        const em = ECS.instance.entityManager;
        // TODO: xdd
        const json = data.data.data;
        (json.scenes ?? []).forEach(async (scene, i) => {
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
        em.currentScene = json.currentScene ?? em.currentScene;
        setGame(json.game ?? null);
        ECS.instance.ensureCamera();
      }
      if (isError) {
        console.error('Something went wrong with scene initialization');
        ECS.instance.ensureCamera();
      }
    }
    load();
  }, [data, isError]);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="editor-hld">
        <Navigation />
        <KeyboardController>
          <div className="editor-section">
            <Allotment vertical snap={true}>
              <Allotment.Pane minSize={200} preferredSize={1000}>
                <Allotment vertical={false} separator={true} snap={true}>
                  <Allotment.Pane
                    minSize={screen.width / 8}
                    preferredSize={screen.width / 6}
                    snap
                  >
                    <Allotment
                      vertical={true}
                      separator={true}
                      minSize={screen.width / 6}
                      snap
                    >
                      <Allotment.Pane
                        minSize={screen.width / 6}
                        preferredSize={screen.width / 5}
                        snap
                      >
                        <HierarchyWindow />
                      </Allotment.Pane>
                      <Allotment.Pane
                        minSize={screen.width / 6}
                        preferredSize={screen.width / 5}
                        snap
                      >
                        <div className="project-window-pane">
                          <ProjectWindow />
                        </div>
                      </Allotment.Pane>
                    </Allotment>
                  </Allotment.Pane>
                  <Allotment.Pane>
                    <Allotment vertical separator minSize={300} snap>
                      <Allotment.Pane
                        minSize={screen.width / 6}
                        preferredSize={screen.width / 3}
                        snap={false}
                      >
                        <SceneTabs />
                        <CanvasController
                          key={`${em.currentScene} ${em.getScene().id}`}
                        />
                      </Allotment.Pane>
                      <Allotment.Pane
                        minSize={screen.height / 6}
                        preferredSize={screen.height / 4}
                      >
                        <ConsoleWindow />
                      </Allotment.Pane>
                    </Allotment>
                  </Allotment.Pane>
                  <Allotment.Pane
                    minSize={screen.width / 6}
                    preferredSize={screen.width / 5}
                  >
                    <InspectorWindow />
                  </Allotment.Pane>
                </Allotment>
              </Allotment.Pane>
            </Allotment>
          </div>
        </KeyboardController>
      </div>
    </DndProvider>
  );
}

export default Editor;
