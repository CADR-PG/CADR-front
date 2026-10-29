import { Canvas } from '@react-three/fiber';
import {
  GizmoHelper,
  GizmoViewport,
  Grid,
  OrbitControls,
  PerspectiveCamera,
} from '@react-three/drei';
import * as THREE from 'three';
import { RefObject, useEffect, useRef, useState } from 'react';
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
  const [canvas, setCanvas] = useState<any>(null);
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

  useEffect(() => {
    if (!canvas || !running) return;

    const handler = async () => {
      await canvas.requestPointerLock();
    };

    const updatePosition = (e: MouseEvent) => {
      const m = ECS.instance.state.mouse;
      m.movementX += e.movementX;
      m.movementY += e.movementY;
    };

    const lockChangeAlert = () => {
      ECS.instance.state.locked = document.pointerLockElement === canvas;
      ECS.instance.state.mouse.movementX = 0;
      ECS.instance.state.mouse.movementY = 0;
    };

    const onKeyDown = (e: KeyboardEvent) => {
      ECS.instance.state.input.add(e.code);
    };

    const onKeyUp = (e: KeyboardEvent) => {
      ECS.instance.state.input.delete(e.code);
    };

    canvas.addEventListener('click', handler);
    document.addEventListener('mousemove', updatePosition);
    document.addEventListener('pointerlockchange', lockChangeAlert);
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('keyup', onKeyUp);

    return () => {
      canvas.removeEventListener('click', handler);
      document.removeEventListener('mousemove', updatePosition);
      document.removeEventListener('pointerlockchange', lockChangeAlert);
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('keyup', onKeyUp);
    };
  }, [canvas, running]);

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
          frameloop={running ? 'always' : 'demand'}
          onCreated={({ camera }) => setCamera(camera)}
          ref={(node) => {
            drop(node);
            setCanvas(node);
          }}
        >
          <EditorFlyControls cameraRef={editCameraRef} active={!running} />
          <Physics colliders="hull" paused={!running} debug>
            <AudioListenerProvider>
              {!running && (
                <OrbitControls
                  makeDefault
                  enableDamping={false}
                  enabled={!running}
                />
              )}
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
