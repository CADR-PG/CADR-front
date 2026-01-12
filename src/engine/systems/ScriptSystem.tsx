import { useFrame } from '@react-three/fiber';
import { ECS } from '../ECS';

export default function ScriptSystem() {
  import('./TestSystem');
  useFrame((state, delta) => {
    ECS.instance.update(delta);
  });

  return null;
}
