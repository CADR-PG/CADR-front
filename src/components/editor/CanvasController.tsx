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
import {
  Selection,
  EffectComposer,
  Outline,
} from '@react-three/postprocessing';
import AudioListenerProvider from './AudioListenerProvider';
import ScriptSystem from '../../engine/systems/ScriptSystem';
import useAssets from '@/stores/useAssets';
import useDownloadFile from '@/hooks/useDownloadFile';
import { ReactNode, useEffect, useState } from 'react';
import { normalizeUrl } from '@/engine/components/helpers/material';
import { sdk } from '@/data/Sdk';

function CanvasController() {
  const { running, focus } = useEditorContext();
  const [Ui, setUi] = useState<() => ReactNode>(null!);
  useEditorKeys();
  RectAreaLightTexturesLib.init();
  const { assets } = useAssets();
  const dirs = assets
    ? assets!.directories!.filter((dir) => dir.name === 'templates')
    : null;
  const { data } = useDownloadFile(
    dirs && dirs[0].files[0] ? dirs[0].files[0].id : '',
  );
  useEffect(() => {
    async function load() {
      if (!data) return;

      try {
        const { default: ui } = await import(
          /* @vite-ignore */ normalizeUrl(data)
        );
        const Component = ui(sdk);
        setUi(() => Component);
      } catch (e) {
        console.error(e);
      }
    }

    load();
  }, [data]);

  return (
    <div className="canvas-container">
      {!running && <ToolbarComponent />}
      <StartStopBtnToolbar />
      {running && Ui && <Ui />}
      <Canvas
        className="canvas"
        onPointerMissed={() => focus(null)}
        camera={{ position: [3, 2, -3] }}
        shadows
        frameloop={running ? 'always' : 'demand'}
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
              <RenderSystem />
            </Selection>
          </AudioListenerProvider>
        </Physics>
      </Canvas>
    </div>
  );
}

export default CanvasController;
