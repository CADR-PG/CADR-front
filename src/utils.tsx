import { SceneObject, SceneObjects } from './types/SceneObject';
import GenericPrimitive from './components/PrimitiveController';
import * as THREE from 'three';

export function downloadJSON(data: unknown, filename: string) {
  const json = JSON.stringify(data);
  const blob = new Blob([json], { type: 'application/json' });
  const href = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = href;
  link.download = filename;
  document.body.appendChild(link);
  link.click();

  document.body.removeChild(link);
  URL.revokeObjectURL(href);
}

export function parseScene(obj: THREE.Object3D): SceneObjects {
  const newObjects: SceneObjects = {};

  obj.traverse((o) => {
    const mesh = o as THREE.Mesh;
    if (!mesh.isMesh) return;

    const uuid = crypto.randomUUID();
    const object: SceneObject = {
      name: mesh.geometry ? mesh.geometry.type.replace('Geometry', '') : 'dupa',
      component: () => (
        <GenericPrimitive
          objectUuid={uuid}
          position={mesh.position}
          rotation={mesh.rotation}
          scale={mesh.scale}
          object={mesh}
        />
      ),
    };

    newObjects[uuid] = object;
  });

  return newObjects;
}
