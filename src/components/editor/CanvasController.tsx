import { Canvas } from '@react-three/fiber';
import {
  GizmoHelper,
  GizmoViewport,
  Grid,
  OrbitControls,
  TransformControls,
} from '@react-three/drei';
import ToolbarComponent from './Toolbar';
import { useEffect, useState } from 'react';
import EditingMode from '../../types/EditingMode';
import { useEditorContext } from '../../hooks/useEditorContext';
import useEditorKeys from '../../hooks/useEditorKeys';
import StartStopBtnToolbar from './StartStopBtnToolbar';
import { RenderSystem } from '../../engine/systems/RenderSystem';
import { ECS } from '../../engine/ECS';
import Material, { BasicMaterialData } from '../../engine/components/Material';
import Transform from '../../engine/components/Transform';
import Geometry, { BoxGeometryData } from '../../engine/components/Geometry';
import Name from '../../engine/components/Name';

function CanvasController() {
  const [mode, selectMode] = useState<EditingMode>('translate');
  const { sceneObjects, running, focused, focus } = useEditorContext();
  useEditorKeys();
  useEffect(() => {
    console.log('test');
  });
  useEffect(() => {
    const entity = ECS.instance.createEntity();
    const materialData: BasicMaterialData = {
      color: 0xff0000,
    };
    ECS.instance.addComponent(new Material('basic', materialData), entity);
    ECS.instance.addComponent(
      new Transform([0, 0, 0], [0, 0, 0], [1, 1, 1]),
      entity,
    );
    const geometryData: BoxGeometryData = {
      dimensions: [2, 2, 2],
    };
    ECS.instance.addComponent(new Geometry('box', geometryData), entity);
    ECS.instance.addComponent(new Name('Box'), entity);
  }, []);
  return (
    <div className="canvas-container">
      {!running && (
        <ToolbarComponent editingMode={mode} selectMode={selectMode} />
      )}
      <StartStopBtnToolbar />
      <Canvas
        className="canvas"
        onPointerMissed={() => focus(null)}
        camera={{ position: [3, 2, -3] }}
      >
        <ambientLight />
        <directionalLight position={[10, 10, 10]} />
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
        <RenderSystem />
      </Canvas>
    </div>
  );
}

export default CanvasController;
