import { TransformControls } from '@react-three/drei';
import ControllerProps from '../../types/ControllerProps';
import { useEditorContext } from '../../hooks/useEditorContext';
import useEntityManager from '../../hooks/useEntityManager';
import Transform from '../../engine/components/Transform';
import { ECS } from '../../engine/ECS';
import * as THREE from 'three';
import { useEffect, useRef } from 'react';
import { useFrame } from '@react-three/fiber';

let p = new THREE.Vector3();
let r = new THREE.Quaternion();
let s = new THREE.Vector3();
let e = new THREE.Euler();

export default function TransformControlsController({
  entity,
}: ControllerProps) {
  const em = useEntityManager();
  const t = em.getComponent(Transform, entity);
  const transform = ECS.instance.entityManager.getComponent(Transform, entity);
  const { editingMode, focused } = useEditorContext();
  const ref = useRef<THREE.Object3D>(null!);
  const acc = useRef(0);

  useEffect(() => {
    if (!t) return;
    ref.current.position.fromArray(t.position);
    ref.current.rotation.fromArray(t.rotation);
    ref.current.scale.fromArray(t.scale);
  }, [focused]);

  useFrame((_, delta) => {
    if (!transform) return;

    acc.current += delta;
    if (acc.current < 1 / 8) return;

    ref.current.matrixWorld.decompose(p, r, s);
    e.setFromQuaternion(r);
    transform.position = [p.x, p.y, p.z];
    transform.rotation = [e.x, e.y, e.z];
    transform.scale = [s.x, s.y, s.z];
    acc.current = 0;
  });

  return (
    <>
      <object3D ref={ref} />
      {focused === entity && (
        <TransformControls object={ref} mode={editingMode} />
      )}
    </>
  );
}
