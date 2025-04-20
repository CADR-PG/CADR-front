import { ReactNode, RefObject, useCallback, useRef, useState } from 'react';
import { ThreeEvent } from '@react-three/fiber';
import * as THREE from 'three';
import { useEditorContext } from '../hooks/useEditorContext';
import ControllerProps from '../types/ControllerProps';
import { SceneObject } from '../types/SceneObject';
import { useThree } from '@react-three/fiber';

function GenericMesh({
  children,
  uuid,
  ...props
}: ControllerProps) {
  const localRef = useRef<THREE.Mesh>(null!);
  const [hovered, hover] = useState(false);
  const [clicked, click] = useState(false);
  const { focus, sceneObjects, setSceneObjects } = useEditorContext();
  const { scene } = useThree();
  console.log(scene);


  const handleClick = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    click(!clicked);
    focus(uuid ?? "");
  };


  const handlePointerOver = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    hover(true);
  };

  const handlePointerOut = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    hover(false);
  };

  const handleRef = useCallback((node: RefObject<THREE.Mesh>) => {
    const updatedSceneObject: SceneObject = {...sceneObjects[uuid ?? ""], ref: node }
    setSceneObjects({...sceneObjects, [uuid ?? ""]: updatedSceneObject});
    }, []);

  return (
    <mesh
      {...props}
      ref={handleRef}
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
