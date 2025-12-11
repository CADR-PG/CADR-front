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
import { useRef, useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import { Scene } from 'three';

function SceneCameras({ running }: { running: boolean }) {
  const editorCamRef = useRef(null);
  const gameCamRef = useRef(null);
  const { set } = useThree();

  useEffect(() => {
    if (running && gameCamRef.current) set({ camera: gameCamRef.current });
    else if (!running && editorCamRef.current)
      set({ camera: editorCamRef.current });
  }, [running, set]);

  return (
    <>
      <PerspectiveCamera
        ref={editorCamRef}
        makeDefault
        position={[3, 2, -3]}
      ></PerspectiveCamera>
      <PerspectiveCamera
        ref={gameCamRef}
        makeDefault
        position={[5, 5, 5]}
      ></PerspectiveCamera>
    </>
  );
}

function CanvasController() {
  const { running, focus } = useEditorContext();
  useEditorKeys();

  return (
    <div className="canvas-container">
      {!running && <ToolbarComponent />}
      <StartStopBtnToolbar />
      <Canvas
        className="canvas"
        onPointerMissed={() => focus(null)}
        camera={{ position: [3, 2, -3] }}
      >
        <ambientLight />
        <directionalLight position={[10, 10, 10]} />
        <SceneCameras running={running} />
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
