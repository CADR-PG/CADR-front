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
import { ECS } from '../../engine/ECS';

function CanvasController() {
  const { running, focus, hovered } = useEditorContext();
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
      >
        {/* <Selection> */}
        {/* <EffectComposer autoClear={false} multisampling={8}> */}
        {/*   <Outline */}
        {/*     selection={ */}
        {/*       hovered */}
        {/*         ? ECS.instance.entityManager.refs[hovered].current */}
        {/*         : undefined */}
        {/*     } */}
        {/*     blur */}
        {/*     edgeStrength={10} */}
        {/*     visibleEdgeColor={0xffffff} */}
        {/*     width={1000} */}
        {/*   /> */}
        {/* </EffectComposer> */}
        <Physics colliders="hull" debug>
          <AudioListenerProvider>
            <OrbitControls
              makeDefault
              enableDamping={false}
              enabled={!running}
            />
            {!running && <Grid sectionSize={2} infiniteGrid />}
            {!running && (
              <GizmoHelper alignment="top-right" margin={[80, 80]}>
                <GizmoViewport
                  axisColors={['red', 'green', 'blue']}
                  labelColor="black"
                />
              </GizmoHelper>
            )}
            <RenderSystem />
          </AudioListenerProvider>
        </Physics>
        {/* </Selection> */}
      </Canvas>
    </div>
  );
}

export default CanvasController;
