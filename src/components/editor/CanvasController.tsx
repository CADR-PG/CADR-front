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
      >
        <OrbitControls makeDefault enableDamping={false} enabled={!running} />
        {!running && <Grid sectionSize={2} infiniteGrid />}
        {!running && (
          <GizmoHelper alignment="top-right" margin={[80, 80]}>
            <GizmoViewport
              axisColors={['red', 'green', 'blue']}
              labelColor="black"
            />
          </GizmoHelper>
        )}
        <mesh receiveShadow castShadow>
          <boxGeometry />
          <meshStandardMaterial color="hotpink" />
        </mesh>
        <mesh position={[3, 0, 0]} receiveShadow castShadow>
          <torusGeometry />
          <meshStandardMaterial color="hotpink" />
        </mesh>
        <RenderSystem />
      </Canvas>
    </div>
  );
}

export default CanvasController;
