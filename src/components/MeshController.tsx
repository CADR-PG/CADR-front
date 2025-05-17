import { useCallback, useState } from 'react';
import { ThreeEvent } from '@react-three/fiber';
import * as THREE from 'three';
import { useEditorContext } from '../hooks/useEditorContext';
import ControllerProps from '../types/ControllerProps';
import { Outlines } from '@react-three/drei';

function GenericMesh({ children, objectUuid, ...props }: ControllerProps) {
  const [hovered, hover] = useState(false);
  const [clicked, click] = useState(false);
  const { focus, setSceneObjects } = useEditorContext();

  const handleClick = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    click(!clicked);
    focus(objectUuid);
  };

  const handlePointerOver = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    hover(true);
  };

  const handlePointerOut = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    hover(false);
  };

  const handleRef = useCallback(
    (node: THREE.Mesh) => {
      // this piece of shit took like an hour of my life
      // because it fires when the ref gets set to null
      if (!node) return;

      setSceneObjects((prevObjects) => ({
        ...prevObjects,
        [objectUuid]: {
          ...prevObjects[objectUuid],
          ref: node,
        },
      }));
    },
    [objectUuid, setSceneObjects],
  );

  return (
    <mesh
      {...props}
      ref={handleRef}
      onClick={handleClick}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
    >
      {children}
      <Outlines thickness={hovered ? 2 : 0} color="white" />
    </mesh>
  );
}

export default GenericMesh;
