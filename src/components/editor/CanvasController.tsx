import { Canvas } from '@react-three/fiber';
import {
  GizmoHelper,
  GizmoViewport,
  Grid,
  OrbitControls,
} from '@react-three/drei';
import ToolbarComponent from './Toolbar';
import { useState } from 'react';
import EditingMode from '../../types/EditingMode';
import { useEditorContext } from '../../hooks/useEditorContext';
import useEditorKeys from '../../hooks/useEditorKeys';
import StartStopBtnToolbar from './StartStopBtnToolbar';
import { RenderSystem } from '../../engine/systems/RenderSystem';

function CanvasController() {
  const [mode, selectMode] = useState<EditingMode>('translate');
  const { focus } = useEditorContext();
  useEditorKeys();

  return (
    <div className="canvas-container">
      <ToolbarComponent editingMode={mode} selectMode={selectMode} />
      <StartStopBtnToolbar />
      <Canvas
        className="canvas"
        onPointerMissed={() => focus(null)}
        camera={{ position: [3, 2, -3] }}
      >
        <ambientLight />
        <directionalLight position={[10, 10, 10]} />
        <OrbitControls makeDefault enableDamping={false} />
        {/* {focused && focused in sceneObjects ? (
          <TransformControls object={sceneObjects[focused].ref} mode={mode} />
        ) : null} */}
        <Grid sectionSize={2} infiniteGrid />
        <GizmoHelper alignment="top-right" margin={[80, 80]}>
          <GizmoViewport
            axisColors={['red', 'green', 'blue']}
            labelColor="black"
          />
        </GizmoHelper>
        <RenderSystem />
      </Canvas>
    </div>
  );
}

export default CanvasController;
