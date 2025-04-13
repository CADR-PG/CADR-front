import { JSX, ReactNode, forwardRef, useRef, useState } from 'react';
import { ThreeEvent } from '@react-three/fiber';
import * as THREE from 'three';

export type GenericMeshProps = JSX.IntrinsicElements['mesh'] & {
  material?: ReactNode;
  parentCallback?: (ref: React.RefObject<THREE.Mesh>) => void;
  children?: ReactNode;
};

const GenericMesh = forwardRef<THREE.Mesh, GenericMeshProps>(
  ({ material, parentCallback, children, ...props }, ref) => {
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
        ref={ref || localRef}
        onClick={handleClick}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      >
        {children}
        {material ?? (
          <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
        )}
      </mesh>
    );
  },
);

export default GenericMesh;
