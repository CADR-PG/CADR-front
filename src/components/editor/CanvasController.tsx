import { Canvas } from '@react-three/fiber';
import {
  GizmoHelper,
  GizmoViewport,
  Grid,
  OrbitControls,
  PerspectiveCamera,
} from '@react-three/drei';
import * as THREE from 'three';
import { RefObject, useRef, useState } from 'react';
import ToolbarComponent from './Toolbar';
import { useEditorContext } from '../../hooks/useEditorContext';
import useEditorKeys from '../../hooks/useEditorKeys';
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
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import useEditorCameraMovement from '../../hooks/useEditorCameraMovement';

// useEditorCameraMovement uses r3f hooks (useThree/useFrame), which only
// work inside the <Canvas> tree - CanvasController itself renders the
// Canvas, so this tiny child does the actual hook call instead.
function EditorFlyControls({
  cameraRef,
  active,
}: {
  cameraRef: RefObject<THREE.PerspectiveCamera>;
  active: boolean;
}) {
  useEditorCameraMovement(cameraRef, active);
  return null;
}

function CanvasController() {
  const { running, focus, setCamera } = useEditorContext();
  const em = useEntityManager();
  const { uuid } = useParams();
  const { mutate: saveScene } = useSaveScene();
  const { scenes, game } = useEditorSettingsStore();
  const [item, setItem] = useState<AssetsFile | null>(null);
  const editCameraRef = useRef<THREE.PerspectiveCamera>(null!);
  useEditorKeys();
  RectAreaLightTexturesLib.init();

  const replaceScene = async (item: AssetsFile) => {
    const em = ECS.instance.entityManager;
    const localScenes = [...scenes];
    localScenes[em.currentScene] = {
      id: item.id,
      name: item.name,
      directoryId: item.directoryId,
    };

    await loadScene(uuid!, item);

    saveScene({
      id: uuid ? uuid : '',
      data: {
        currentScene: em.currentScene,
        scenes: localScenes,
        game,
      },
    });
  };

  const [_, drop] = useDrop(
    () => ({
      accept: DndTypes.FILE,
      drop: async (item: AssetsFile, _monitor) => {
        const em = ECS.instance.entityManager;
        if (em.getScene().dirty) {
          setItem(item);
        } else {
          await replaceScene(item);
        }
      },
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
        canDrop: !!monitor.canDrop(),
      }),
    }),
    [scenes, loadScene, saveScene, replaceScene],
  );

  return (
    <>
      <div className="canvas-container">
        <ToolbarComponent />
        {running && <UISystem />}
        <Canvas
          className="canvas"
          onPointerMissed={() => focus(null)}
          camera={{
            position: em.getScene()
              ? em.getScene().lastCameraPosition
              : undefined,
          }}
          shadows
          frameloop={'always'}
          onCreated={({ camera }) => setCamera(camera)}
          ref={(node) => {
            drop(node);
          }}
        >
          {/* Explicit, always-mounted edit-viewport camera - given directly
              to OrbitControls below so it can never end up bound to
              whichever camera happens to be the scene's active default
              (e.g. the player camera while Play is running). */}
          <PerspectiveCamera
            ref={editCameraRef}
            makeDefault={!running}
            position={[3, 2, -3]}
          />
          <EditorFlyControls cameraRef={editCameraRef} active={!running} />
          <Physics colliders="hull" paused={!running} debug>
            <AudioListenerProvider>
              <OrbitControls
                camera={editCameraRef.current ?? undefined}
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
      <Dialog open={item !== null} onClose={() => setItem(null)} role="dialog">
        <DialogTitle>Unsaved changes</DialogTitle>
        <DialogContent>
          You have unsaved changes. Are you sure you want to replace the scene?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setItem(null)}>Cancel</Button>
          <Button
            onClick={() => {
              replaceScene(item!);
              setItem(null);
            }}
          >
            Replace
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default CanvasController;
