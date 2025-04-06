import { useRef, useState } from 'react';
import * as THREE from 'three';
import { ThreeElements } from '@react-three/fiber';

function OctahedronController(props: ThreeElements['mesh']) {
  const ref = useRef<THREE.Mesh>(null!);
  const [hovered, hover] = useState(false);
  const [clicked, click] = useState(false);

  return (
    <mesh
      {...props}
      ref={ref}
      onClick={() => click(!clicked)}
      onPointerOver={() => hover(true)}
      onPointerOut={() => hover(false)}
    >
      <octahedronGeometry args={[1, 0]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  );
}

export default OctahedronController;
