import { TransformControls } from '@react-three/drei';
import ControllerProps from '../../types/ControllerProps';
import { useEditorContext } from '../../hooks/useEditorContext';
import useEntityManager from '../../hooks/useEntityManager';
import Transform, {
  addVec3,
  subVec3,
  toLocal,
  toWorld,
} from '../../engine/components/Transform';
import { ECS } from '../../engine/ECS';
import * as THREE from 'three';
import { useEffect, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import useComponents from '@/hooks/useComponents';
import Parent from '@/engine/components/Parent';

const p = new THREE.Vector3();
const r = new THREE.Quaternion();
const s = new THREE.Vector3();
const e = new THREE.Euler();

export default function TransformControlsController({
  entity,
}: ControllerProps) {
  const [lDragged, lDrag] = useState(false);
  const em = useEntityManager();
  const t = em.getComponent(Transform, entity);
  const transform = ECS.instance.entityManager.getComponent(Transform, entity);
  const { editingMode, focused, drag, dragged } = useEditorContext();
  const ref = useRef<THREE.Object3D>(null!);
  // const parent = em.getComponent(Parent, entity);
  // const pPos =
  //   parent && parent.entity ? em.getComponent(Transform, parent.entity) : null;

  useEffect(() => {
    if (!t) return;
    ref.current.position.fromArray(toWorld(t.position, entity));
    ref.current.rotation.fromArray(toWorld(t.rotation, entity));
    // ref.current.scale.fromArray(toWorld(t.scale, entity));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useFrame((_) => {
    if (!dragged || !lDragged || !transform) return;

    ref.current.matrixWorld.decompose(p, r, s);
    e.setFromQuaternion(r);
    // transform.position = [p.x, p.y, p.z];
    const newPos = toLocal([p.x, p.y, p.z], entity);
    transform.position = newPos;
    transform.rotation = [e.x, e.y, e.z];
    transform.scale = [s.x, s.y, s.z];
  });

  return (
    <>
      <object3D
        position={!dragged ? toWorld(t!.position, entity) : undefined}
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
