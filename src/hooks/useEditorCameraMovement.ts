import { useFrame, useThree } from '@react-three/fiber';
import { useKeyboardControls } from '@react-three/drei';
import * as THREE from 'three';
import { RefObject, useEffect } from 'react';
import Controls from '../types/Controls';

const SPEED = 4;
const WORLD_UP = new THREE.Vector3(0, 1, 0);
const forward = new THREE.Vector3();
const right = new THREE.Vector3();
const movement = new THREE.Vector3();

// Noclip-style flight for the editor viewport camera. If the active
// controls expose an orbit-style `target` (drei's OrbitControls does),
// it's shifted by the same delta so flying doesn't fight the look
// direction on the next orbit update.
export default function useEditorCameraMovement(
  cameraRef: RefObject<THREE.Camera>,
  active: boolean,
) {
  const [subscribeKeys, getKeys] = useKeyboardControls<Controls>();
  const get = useThree((state) => state.get);
  const invalidate = useThree((state) => state.invalidate);

  // The canvas uses frameloop="demand" while editing, so nothing re-renders
  // on its own - wake it up the moment a relevant key changes, otherwise
  // holding WASD would do nothing until something else happens to redraw.
  useEffect(() => {
    if (!active) return;
    return subscribeKeys(() => invalidate());
  }, [active, subscribeKeys, invalidate]);

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
    }

    if (keys[Controls.up]) movement.y += SPEED * delta;
    if (keys[Controls.down]) movement.y -= SPEED * delta;

    if (movement.lengthSq() === 0) return;

    camera.position.add(movement);
    const target = (get().controls as { target?: THREE.Vector3 } | null)
      ?.target;
    target?.add(movement);

    // Still moving - keep the demand loop awake for the next frame too.
    invalidate();
  });
}
