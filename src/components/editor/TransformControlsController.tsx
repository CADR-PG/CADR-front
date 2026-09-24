import { TransformControls } from '@react-three/drei';
import ControllerProps from '../../types/ControllerProps';
import { useEditorContext } from '../../hooks/useEditorContext';
import useEntityManager from '../../hooks/useEntityManager';
import Transform from '../../engine/components/Transform';
import { ECS } from '../../engine/ECS';
import * as THREE from 'three';
import { useEffect, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import Parent from '@/engine/components/Parent';
import useWorldTransform from '@/hooks/useWorldTransform';
import { applyMatrix, getWorldMatrix, toMatrix } from '@/engine/Hierarchy';

const p = new THREE.Vector3();
const r = new THREE.Quaternion();
const s = new THREE.Vector3();
const e = new THREE.Euler();

export default function TransformControlsController({
  entity,
}: ControllerProps) {
  const [lDragged, lDrag] = useState(false);
  const em = useEntityManager();
  const t = useWorldTransform(entity);
  const transform = ECS.instance.entityManager.getComponent(Transform, entity);
  const { editingMode, focused, drag, dragged } = useEditorContext();
  const ref = useRef<THREE.Object3D>(null!);
  const parent = em.getComponent(Parent, entity)?.entity;
  // const pPos =
  //   parent && parent.entity ? em.getComponent(Transform, parent.entity) : null;

  useEffect(() => {
    if (!t) return;
    ref.current.position.fromArray(t.position);
    ref.current.rotation.fromArray(t.rotation);
    ref.current.scale.fromArray(t.scale);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useFrame((_) => {
    if (!dragged || !lDragged || !transform) return;

    ref.current.matrixWorld.decompose(p, r, s);
    e.setFromQuaternion(r);
    const newT = new Transform(
      [p.x, p.y, p.z],
      [r.x, r.y, r.z],
      [s.x, s.y, s.z],
    );
    const world = toMatrix(newT);
    const local = parent
      ? getWorldMatrix(parent).invert().multiply(world)
      : world;
    applyMatrix(transform, local);
  });

  return (
    <>
      <object3D
        position={!dragged ? t!.position : undefined}
        rotation={!dragged ? t!.rotation : undefined}
        scale={!dragged ? t!.scale : undefined}
        ref={ref}
      />

      {focused === entity && (
        <TransformControls
          object={ref}
          mode={editingMode}
          onMouseDown={() => {
            drag(true);
            lDrag(true);
          }}
          onMouseUp={() => {
            drag(false);
            lDrag(false);
          }}
        />
      )}
    </>
  );
}
