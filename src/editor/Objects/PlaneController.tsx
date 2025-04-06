import { useRef, useState } from 'react';
import * as THREE from 'three';
import { ThreeElements, useFrame } from '@react-three/fiber';

function PlaneController(props: ThreeElements['mesh']) {
  const ref = useRef<THREE.Mesh>(null!);
  const [hovered, hover] = useState(false);
  const [clicked, click] = useState(false);

  useFrame((_, delta) => {
    ref.current.rotation.z += delta * 0.1;
    ref.current.rotation.y += delta * 0.1;
  });

  return (
    <mesh
      {...props}
      ref={ref}
      scale={clicked ? 1.5 : 1}
      onClick={() => click(!clicked)}
      onPointerOver={() => hover(true)}
      onPointerOut={() => hover(false)}
    >
      <planeGeometry args={[3, 3, 32, 32]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  );
}

export default PlaneController;
