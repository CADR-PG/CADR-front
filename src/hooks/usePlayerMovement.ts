import { useFrame } from '@react-three/fiber';
import { useKeyboardControls } from '@react-three/drei';
import * as THREE from 'three';
import { RefObject } from 'react';
import Controls from '../types/Controls';

const SPEED = 4;
const WORLD_UP = new THREE.Vector3(0, 1, 0);
const forward = new THREE.Vector3();
const right = new THREE.Vector3();
const movement = new THREE.Vector3();

// Simple noclip-style flight controller: WASD/arrows move on the camera's
// look-direction plane, space/shift move straight up/down. Mouse-look is
// handled separately by PointerLockControls.
export default function usePlayerMovement(
  cameraRef: RefObject<THREE.Camera>,
  active: boolean,
) {
  const [, getKeys] = useKeyboardControls<Controls>();

  useFrame((_, delta) => {
    const camera = cameraRef.current;
    if (!active || !camera) return;

    const keys = getKeys();

    camera.getWorldDirection(forward);
    forward.y = 0;
    forward.normalize();
    right.crossVectors(forward, WORLD_UP);

    movement.set(0, 0, 0);
    if (keys[Controls.forward]) movement.add(forward);
    if (keys[Controls.back]) movement.sub(forward);
    if (keys[Controls.right]) movement.add(right);
    if (keys[Controls.left]) movement.sub(right);

    if (movement.lengthSq() > 0) {
      movement.normalize().multiplyScalar(SPEED * delta);
      camera.position.add(movement);
    }

    if (keys[Controls.up]) camera.position.y += SPEED * delta;
    if (keys[Controls.down]) camera.position.y -= SPEED * delta;
  });
}
