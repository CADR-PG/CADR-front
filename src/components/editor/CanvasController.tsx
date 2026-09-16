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

function CanvasController() {
  const { running, focus } = useEditorContext();
  const editCameraRef = useRef<THREE.PerspectiveCamera>(null!);
  useEditorKeys();

  return (
    <div className="canvas-container">
      {!running && <ToolbarComponent />}
      <StartStopBtnToolbar />
      <Canvas className="canvas" onPointerMissed={() => focus(null)}>
        <ambientLight />
        <directionalLight position={[10, 10, 10]} />
        {/* Explicit, always-mounted edit-viewport camera - given directly
            to OrbitControls below so it can never end up bound to
            whichever camera happens to be the scene's active default
            (e.g. the player camera while Play is running). */}
        <PerspectiveCamera
          ref={editCameraRef}
          makeDefault={!running}
          position={[3, 2, -3]}
        />
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
        {!running && (
          <OrbitControls
            camera={editCameraRef.current ?? undefined}
            makeDefault
            enableDamping={false}
          />
        )}
      </Canvas>
    </div>
  );
}

export default CanvasController;
