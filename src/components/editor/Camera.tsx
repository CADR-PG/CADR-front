import { OrbitControls, useKeyboardControls } from  '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import Controls from '../types/Controls';
import * as THREE from 'three';

const direction = new THREE.Vector3()
const frontVector = new THREE.Vector3()
const sideVector = new THREE.Vector3()
const SPEED = 10;

function Camera() {
  const [sub, get] = useKeyboardControls<Controls>();
  useFrame((state, delta) => {
    if (get().up) state.scene.position.z += SPEED * delta;
    if (get().down) state.scene.position.z -= SPEED * delta;
    if (get().left) state.scene.position.x -= SPEED * delta;
    if (get().right) state.scene.position.x += SPEED * delta;
  });

  return (<OrbitControls makeDefault enableDamping={false} />)
}

export default Camera;
