import { useEffect, useRef } from 'react';
import { PerspectiveCamera } from '@react-three/drei';
import { useThree } from '@react-three/fiber';

interface SceneCameraProps {
  active: boolean;
  position?: [number, number, number];
  fov?: number;
}

export default function SceneCamera({
  active,
  position = [0, 0, 5],
  fov = 75,
}: SceneCameraProps) {
  const cameraRef = useRef(null);
  const { set } = useThree();

  useEffect(() => {
    if (active && cameraRef.current) {
      set({ camera: cameraRef.current });
    }
  }, [active, set]);

  return <PerspectiveCamera ref={cameraRef} position={position} fov={fov} />;
}
