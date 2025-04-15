import { ReactNode, useRef, useState } from 'react';
import { ThreeEvent } from '@react-three/fiber';
import * as THREE from 'three';

function GenericMesh({
  parentCallback,
  children,
  ...props
}: {
  parentCallback?: (ref: React.RefObject<THREE.Mesh>) => void;
  children?: ReactNode;
  [key: string]: unknown;
}) {
  const localRef = useRef<THREE.Mesh>(null!);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  const handleClick = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    setClicked(!clicked);
    if (parentCallback) {
      parentCallback(localRef);
    }
  };

  const handlePointerOver = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    setHovered(true);
  };

  const handlePointerOut = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    setHovered(false);
  };

  return (
    <mesh
      {...props}
      ref={localRef}
      onClick={handleClick}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
    >
      {children}
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  );
}

export default GenericMesh;
