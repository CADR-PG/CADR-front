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
import { RenderSystem } from '../../engine/systems/RenderSystem';
import { RectAreaLightTexturesLib } from 'three/addons/lights/RectAreaLightTexturesLib.js';
import { Physics } from '@react-three/rapier';
import { AudioListenerProvider } from '../../hooks/useAudioListener';
import {
  Selection,
  EffectComposer,
  Outline,
} from '@react-three/postprocessing';

function CanvasController() {
  const { running, focus } = useEditorContext();
  useEditorKeys();
  RectAreaLightTexturesLib.init();

  return (
    <div className="canvas-container">
      {!running && <ToolbarComponent />}
      <StartStopBtnToolbar />
      <Canvas
        className="canvas"
        onPointerMissed={() => focus(null)}
        camera={{ position: [3, 2, -3] }}
        shadows
        frameloop={running ? 'always' : 'demand'}
      >
        <Physics colliders="hull" debug>
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
