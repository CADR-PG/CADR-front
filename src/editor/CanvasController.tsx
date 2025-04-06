import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import TorusController from './Objects/TorusController';
import { JSX } from 'react';

interface CanvasControllerProps {
  objects: JSX.Element[];
}

function CanvasController({ objects }: CanvasControllerProps) {
  return (
    <Canvas className="canvas" camera={{ position: [0, 0, 30] }}>
      <ambientLight />
      <directionalLight position={[10, 10, 10]} />
      <TorusController position={[-5, 0, 0]} />
      <TorusController position={[5, 0, 0]} />
      <OrbitControls enableDamping={false} />
      {objects}
    </Canvas>
  );
}

export default CanvasController;
