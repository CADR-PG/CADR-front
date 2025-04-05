import { Canvas } from '@react-three/fiber';
import { Grid, OrbitControls, TransformControls } from '@react-three/drei';
import { JSX, RefObject } from 'react';
import * as THREE from 'three';

interface CanvasControllerProps {
  objects: JSX.Element[];
  refObj?: RefObject<THREE.Mesh>;
}

function CanvasController({ objects, refObj }: CanvasControllerProps) {
  return (
    <Canvas className="canvas" camera={{ position: [0, 10, 20] }}>
      <ambientLight />
      <directionalLight position={[10, 10, 10]} />
      <OrbitControls makeDefault enableDamping={false} />
      {refObj?.current ? <TransformControls object={refObj} /> : undefined}
      <Grid sectionSize={4} infiniteGrid />
      {objects}
    </Canvas>
  );
}

export default CanvasController;
