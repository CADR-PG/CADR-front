import { Canvas, useThree } from '@react-three/fiber';
import {
  GizmoHelper,
  GizmoViewport,
  Grid,
  OrbitControls,
  PerspectiveCamera,
  TransformControls,
} from '@react-three/drei';
import ToolbarComponent from './Toolbar';
import { useState, useRef, useEffect } from 'react';
import EditingMode from '../../types/EditingMode';
import { useEditorContext } from '../../hooks/useEditorContext';
import useEditorKeys from '../../hooks/useEditorKeys';
import StartStopBtnToolbar from './StartStopBtnToolbar';

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
  const [mode, selectMode] = useState<EditingMode>('translate');
  const { sceneObjects, running, focused, focus } = useEditorContext();
  useEditorKeys();
  return (
    <div className="canvas-container">
      {!running && (
        <ToolbarComponent editingMode={mode} selectMode={selectMode} />
      )}
      <StartStopBtnToolbar />
      <Canvas className="canvas" onPointerMissed={() => focus(null)}>
        <ambientLight />
        <directionalLight position={[10, 10, 10]} />

        <SceneCameras running={running}></SceneCameras>

        <OrbitControls makeDefault enableDamping={false} enabled={!running} />
        {focused && focused in sceneObjects && !running ? (
          <TransformControls object={sceneObjects[focused].ref} mode={mode} />
        ) : null}
        <Grid sectionSize={2} infiniteGrid />
        {!running && (
          <GizmoHelper alignment="top-right" margin={[80, 80]}>
            <GizmoViewport
              axisColors={['red', 'green', 'blue']}
              labelColor="black"
            />
          </GizmoHelper>
        )}
        <group>
          {Object.entries(sceneObjects).map(([uuid, object]) =>
            object.component ? (
              <object.component key={uuid} objectUuid={uuid} />
            ) : null,
          )}
        </group>
      </Canvas>
    </div>
  );
}

export default CanvasController;
