import { Canvas } from '@react-three/fiber';
import { Grid, OrbitControls, TransformControls, KeyboardControls } from '@react-three/drei';
import { JSX, RefObject } from 'react';
import Camera from './Camera';
import * as THREE from 'three';
import Controls from '../types/Controls';

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
  const unfocusObject = () => {
    if (currentRef?.current) {
      setRef(null);
    }
  };

  return (
    <KeyboardControls
      map={[
        { name: Controls.up, keys: ["ArrowUp", "w", "W"] },
        { name: Controls.down, keys: ["ArrowDown", "s", "S"] },
        { name: Controls.left, keys: ["ArrowLeft", "a", "A"] },
        { name: Controls.right, keys: ["ArrowRight", "d", "D"] },
      ]}>
      <Canvas
        className="canvas"
        onPointerMissed={unfocusObject}
        camera={{ position: [3, 2, 3] }}
    >
        <ambientLight />
        <directionalLight position={[10, 10, 10]} />
        <Camera />
        {currentRef?.current ? (
          <TransformControls object={currentRef} />
        ) : undefined}
        <Grid followCamera sectionSize={2} infiniteGrid />
        {objects}
      </Canvas>
    </KeyboardControls>
  );
}

export default CanvasController;
