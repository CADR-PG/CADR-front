import { Canvas } from '@react-three/fiber';
import { Grid, OrbitControls, TransformControls } from '@react-three/drei';
import ToolbarComponent from './Toolbar';
import { JSX, RefObject, useState } from 'react';
import * as THREE from 'three';
import OrientationCube from './OrientationCube';
import EditingMode from '../../types/EditingMode';

interface CanvasControllerProps {
  objects: JSX.Element[];
  currentRef?: RefObject<THREE.Mesh> | null;
  setRef: (ref: RefObject<THREE.Mesh> | null) => void;
}

function CanvasController({
  objects,
  currentRef,
  setRef,
}: CanvasControllerProps) {
  const [mode, selectMode] = useState<EditingMode>('translate');

  const unfocusObject = () => {
    if (currentRef?.current) {
      setRef(null);
    }
  };

  return (
    <div className="canvas-container">
      <ToolbarComponent editingMode={mode} selectMode={selectMode} />
      <Canvas
        className="canvas"
        onPointerMissed={unfocusObject}
        camera={{ position: [3, 2, -3] }}
      >
        <ambientLight />
        <directionalLight position={[10, 10, 10]} />
        <OrbitControls makeDefault enableDamping={false} />
        {currentRef?.current ? (
          <TransformControls object={currentRef} mode={mode} />
        ) : undefined}
        <Grid sectionSize={2} infiniteGrid />
        <OrientationCube />
        {objects}
      </Canvas>
    </div>
  );
}

export default CanvasController;
