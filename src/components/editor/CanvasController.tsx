import { Canvas } from '@react-three/fiber';
import { GizmoHelper, GizmoViewport, Grid, OrbitControls, TransformControls } from '@react-three/drei';
import ToolbarComponent from './Toolbar';
import { useState } from 'react';
import EditingMode from '../../types/EditingMode';
import { useEditorContext } from '../../hooks/useEditorContext';

function CanvasController() {
  const [mode, selectMode] = useState<EditingMode>('translate');
  const { sceneObjects, focused, focus } = useEditorContext();

  return (
    <div className="canvas-container">
      <ToolbarComponent editingMode={mode} selectMode={selectMode} />
      <Canvas
        className="canvas"
        onPointerMissed={() => focus(null)}
        camera={{ position: [3, 2, -3] }}
      >
        <ambientLight />
        <directionalLight position={[10, 10, 10]} />
        <OrbitControls makeDefault enableDamping={false} />
        {focused ? (
          <TransformControls object={sceneObjects[focused].ref} mode={mode} />
        ) : undefined}
        <Grid sectionSize={2} infiniteGrid />
        <GizmoHelper
          alignment="top-right"
          margin={[80, 80]}
        >
          <GizmoViewport axisColors={['red', 'green', 'blue']} labelColor="black" />
        </GizmoHelper>
        {Object.entries(sceneObjects).map(([uuid, object]) => (
          <object.component objectUuid={uuid} />
        ))}
      </Canvas>
    </div>
  );
}

export default CanvasController;
