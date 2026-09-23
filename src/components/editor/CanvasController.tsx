import { Canvas } from '@react-three/fiber';
import {
  GizmoHelper,
  GizmoViewport,
  Grid,
  OrbitControls,
  PerspectiveCamera,
} from '@react-three/drei';
import * as THREE from 'three';
import { useRef } from 'react';
import ToolbarComponent from './Toolbar';
import { useEditorContext } from '../../hooks/useEditorContext';
import useEditorKeys from '../../hooks/useEditorKeys';
import StartStopBtnToolbar from './StartStopBtnToolbar';
import { RenderSystem } from '../../engine/systems/RenderSystem';
import { RectAreaLightTexturesLib } from 'three/addons/lights/RectAreaLightTexturesLib.js';
import { Physics } from '@react-three/rapier';
import {
  Selection,
  EffectComposer,
  Outline,
} from '@react-three/postprocessing';
import AudioListenerProvider from './AudioListenerProvider';

function CanvasController() {
  const { running, focus } = useEditorContext();
  const editCameraRef = useRef<THREE.PerspectiveCamera>(null!);
  useEditorKeys();
  RectAreaLightTexturesLib.init();

  return (
    <div className="canvas-container">
      {!running && <ToolbarComponent />}
      <StartStopBtnToolbar />
      <Canvas
        className="canvas"
        onPointerMissed={() => focus(null)}
        shadows
        frameloop={running ? 'always' : 'demand'}
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
        <Physics colliders="hull" paused={!running} debug={!running}>
          <AudioListenerProvider>
            {!running && (
              <OrbitControls
                camera={editCameraRef.current ?? undefined}
                makeDefault
                enableDamping={false}
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
              <RenderSystem />
            </Selection>
          </AudioListenerProvider>
        </Physics>
      </Canvas>
    </div>
  );
}

export default CanvasController;
