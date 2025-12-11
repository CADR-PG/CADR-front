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
import SceneCamera from './geometries/SceneCamera';
import { useState } from 'react';

function CanvasController() {
  const { running, focus } = useEditorContext();
  useEditorKeys();

  const [extraCamera, setExtraCamera] = useState<{
    position: [number, number, number];
    fov?: number;
  } | null>(null);

  const addCamera = () => {
    if (!extraCamera) {
      setExtraCamera({ position: [3, 5, 5], fov: 75 });
    }
  };

  return (
    <div className="canvas-container">
      {!running && <ToolbarComponent />}
      <StartStopBtnToolbar />
      {!running && <button onClick={addCamera}>Add Camera</button>}
      <Canvas
        className="canvas"
        onPointerMissed={() => focus(null)}
        camera={{ position: [3, 2, -3] }}
      >
        <ambientLight />
        <directionalLight position={[10, 10, 10]} />
        {/* <SceneCameras running={running} /> */}
        {/* <SceneCamera active={running} position={[3, 20, -3]}></SceneCamera> */}
        {/* <SceneCamera active={!running} position={[3, 2, -3]}></SceneCamera> */}
        {running && extraCamera && (
          <group position={extraCamera.position}>
            <mesh>
              <coneGeometry args={[0.5, 1, 4]}></coneGeometry>
              <meshStandardMaterial color="orange"></meshStandardMaterial>
            </mesh>
            <SceneCamera
              active
              position={[0, 1, 0]}
              fov={extraCamera.fov}
            ></SceneCamera>
          </group>
        )}
        <OrbitControls makeDefault enableDamping={false} enabled={!running} />
        <Grid sectionSize={2} infiniteGrid />
        {!running && (
          <GizmoHelper alignment="top-right" margin={[80, 80]}>
            <GizmoViewport
              axisColors={['red', 'green', 'blue']}
              labelColor="black"
            />
          </GizmoHelper>
        )}
        <RenderSystem />
      </Canvas>
    </div>
  );
}

export default CanvasController;
