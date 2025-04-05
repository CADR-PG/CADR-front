import { useRef, useState } from 'react';
import * as THREE from 'three';
import ControllerProps from '../../types/ControllerProps';
import { ThreeEvent } from '@react-three/fiber';

function LatheController({
  parentCallback,
  children,
  ...props
}: ControllerProps) {
  const ref = useRef<THREE.Mesh>(null!);
  const [hovered, hover] = useState(false);
  const [clicked, click] = useState(false);

  const handleClick = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    click(!clicked);
    parentCallback(ref);
  };

  const handlePointerOver = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    hover(true);
  };

  const handlePointerOut = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    hover(false);
  };

  const points = [];
  for (let i = 0; i < 10; i++) {
    points.push(new THREE.Vector2(Math.sin(i * 0.2) * 1.5 + 1, (i - 5) * 0.4));
  }

  return (
    <mesh
      {...props}
      ref={ref}
      onClick={handleClick}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
    >
      <latheGeometry args={[points, 32]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  );
}

export default LatheController;
