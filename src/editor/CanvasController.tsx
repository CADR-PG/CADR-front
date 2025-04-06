import { Canvas } from '@react-three/fiber';
import { Grid, OrbitControls, TransformControls } from '@react-three/drei';
import { JSX, RefObject } from 'react';
import * as THREE from 'three';

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
    <Canvas
      className="canvas"
      onPointerMissed={unfocusObject}
      camera={{ position: [3, 2, 3] }}
    >
      <ambientLight />
      <directionalLight position={[10, 10, 10]} />
      <OrbitControls makeDefault enableDamping={false} />
      {currentRef?.current ? (
        <TransformControls object={currentRef} />
      ) : undefined}
      <Grid sectionSize={2} infiniteGrid />
      {objects}
    </Canvas>
  );
}

export default CanvasController;
