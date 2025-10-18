import { Canvas } from '@react-three/fiber';
import {
  GizmoHelper,
  GizmoViewport,
  Grid,
  OrbitControls,
  TransformControls,
} from '@react-three/drei';
import ToolbarComponent from './Toolbar';
import { useState } from 'react';
import EditingMode from '../../types/EditingMode';
import { useEditorContext } from '../../hooks/useEditorContext';
import useEditorKeys from '../../hooks/useEditorKeys';
import { UNSAFE_getPatchRoutesOnNavigationFunction } from 'react-router-dom';
import StartStopBtnToolbar from './StartStopBtnToolbar';

function CanvasController() {
  const [mode, selectMode] = useState<EditingMode>('translate');
  const { sceneObjects, focused, focus } = useEditorContext();
  useEditorKeys();

  return (
    <div className="canvas-container">
      <ToolbarComponent editingMode={mode} selectMode={selectMode} />
      <StartStopBtnToolbar></StartStopBtnToolbar>
      <Canvas
        className="canvas"
        onPointerMissed={() => focus(null)}
        camera={{ position: [3, 2, -3] }}
      >
        <ambientLight />
        <directionalLight position={[10, 10, 10]} />
        <OrbitControls makeDefault enableDamping={false} />
        {focused && focused in sceneObjects ? (
          <TransformControls object={sceneObjects[focused].ref} mode={mode} />
        ) : null}
        <Grid sectionSize={2} infiniteGrid />
        <GizmoHelper alignment="top-right" margin={[80, 80]}>
          <GizmoViewport
            axisColors={['red', 'green', 'blue']}
            labelColor="black"
          />
        </GizmoHelper>
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
