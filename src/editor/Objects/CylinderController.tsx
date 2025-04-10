import { useRef, useState } from 'react';
import * as THREE from 'three';
import { ThreeEvent } from '@react-three/fiber';
import ControllerProps from '../../types/ControllerProps';

function CylinderController({
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

  return (
    <mesh
      {...props}
      ref={ref}
      onClick={handleClick}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
    >
      <cylinderGeometry args={[1, 1, 2, 32]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
      {children}
    </mesh>
  );
}

export default CylinderController;
