import { useRef, useState } from 'react';
import * as THREE from 'three';
import { ThreeElements, useFrame } from '@react-three/fiber';

function LatheController(props: ThreeElements['mesh']) {
  const ref = useRef<THREE.Mesh>(null!);
  const [hovered, hover] = useState(false);
  const [clicked, click] = useState(false);

  const points = [];
  for (let i = 0; i < 10; i++) {
    points.push(new THREE.Vector2(Math.sin(i * 0.2) * 1.5 + 1, (i - 5) * 0.4));
  }

  useFrame((_, delta) => {
    ref.current.rotation.z += delta;
    ref.current.rotation.y += delta;
    ref.current.rotation.x += delta;
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
      <latheGeometry args={[points, 32]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  );
}

export default LatheController;
