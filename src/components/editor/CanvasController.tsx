import { Canvas } from '@react-three/fiber';
import {
  GizmoHelper,
  GizmoViewport,
  Grid,
  OrbitControls,
} from '@react-three/drei';
import ToolbarComponent from './Toolbar';
import { useEditorContext } from '../../hooks/useEditorContext';
import useEditorKeys from '../../hooks/useEditorKeys';
import StartStopBtnToolbar from './StartStopBtnToolbar';
import { RectAreaLightTexturesLib } from 'three/addons/lights/RectAreaLightTexturesLib.js';
import { Physics } from '@react-three/rapier';
import {
  Selection,
  EffectComposer,
  Outline,
} from '@react-three/postprocessing';
import AudioListenerProvider from './AudioListenerProvider';
import ScriptSystem from '../../engine/systems/ScriptSystem';
import UISystem from '@/engine/systems/UISystem';
import RenderSystemWrapper from '@/engine/systems/RenderSystemWrapper';
import useEntityManager from '@/hooks/useEntityManager';
import { useDrop } from 'react-dnd';
import { DndTypes } from '@/types/DndTypes';
import { AssetsFile } from '@/types/Assets';
import { loadScene } from '@/engine/Scene';
import { useParams } from 'react-router-dom';
import useSaveScene from '@/hooks/useSaveScene';
import { ECS } from '@/engine/ECS';
import { useEditorSettingsStore } from '@/stores/editorSettingsStore';

function CanvasController() {
  const { running, focus, setCamera } = useEditorContext();
  const em = useEntityManager();
  const { uuid } = useParams();
  const { mutate: saveScene } = useSaveScene();
  const { scenes } = useEditorSettingsStore();
  const [_, drop] = useDrop(
    () => ({
      accept: DndTypes.FILE,
      drop: (item: AssetsFile, _monitor) => {
        const em = ECS.instance.entityManager;
        const localScenes = [...scenes];
        localScenes[em.currentScene] = {
          id: item.id,
          name: item.name,
          directoryId: item.directoryId,
        };

        loadScene(uuid!, item);

        saveScene({
          id: uuid ? uuid : '',
          data: {
            currentScene: em.currentScene,
            scenes: localScenes,
          },
        });
      },
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
        canDrop: !!monitor.canDrop(),
      }),
    }),
    [],
  );
  useEditorKeys();
  RectAreaLightTexturesLib.init();

  return (
    <div className="canvas-container">
      {running && <UISystem />}
      {!running && <ToolbarComponent />}
      <StartStopBtnToolbar />
      <Canvas
        className="canvas"
        onPointerMissed={() => focus(null)}
        camera={{ position: em.getScene().lastCameraPosition }}
        shadows
        frameloop={'always'}
        onCreated={({ camera }) => setCamera(camera)}
        ref={(node) => {
          drop(node);
        }}
      >
        <Physics colliders="hull" paused={!running} debug>
          <AudioListenerProvider>
            <OrbitControls
              makeDefault
              enableDamping={false}
              enabled={!running}
            />
            {!running && <Grid sectionSize={2} infiniteGrid />}
            {!running && (
              <GizmoHelper
                alignment="top-right"
                margin={[80, 80]}
                renderPriority={2}
              >
                <GizmoViewport
                  axisColors={['red', 'green', 'blue']}
                  labelColor="black"
                />
              </GizmoHelper>
            )}
            {running && <ScriptSystem />}

            <Selection>
              <EffectComposer
                autoClear={false}
                multisampling={0}
                renderPriority={1}
              >
                <Outline
                  edgeStrength={1}
                  visibleEdgeColor={0xffffff}
                  resolutionX={480}
                  resolutionY={480}
                />
              </EffectComposer>
              <RenderSystemWrapper />
            </Selection>
          </AudioListenerProvider>
        </Physics>
      </Canvas>
    </div>
  );
}

export default CanvasController;
