import { TransformControls } from '@react-three/drei';
import ControllerProps from '../../types/ControllerProps';
import { useEditorContext } from '../../hooks/useEditorContext';
import useEntityManager from '../../hooks/useEntityManager';
import Transform from '../../engine/components/Transform';
import { ECS } from '../../engine/ECS';
import * as THREE from 'three';
import { useEffect, useRef } from 'react';
import { useFrame } from '@react-three/fiber';

const p = new THREE.Vector3();
const r = new THREE.Quaternion();
const s = new THREE.Vector3();
const e = new THREE.Euler();

export default function TransformControlsController({
  entity,
}: ControllerProps) {
  const em = useEntityManager();
  const t = em.getComponent(Transform, entity);
  const transform = ECS.instance.entityManager.getComponent(Transform, entity);
  const { editingMode, focused, drag, dragged } = useEditorContext();
  const ref = useRef<THREE.Object3D>(null!);

  useEffect(() => {
    if (!t) return;
    ref.current.position.fromArray(t.position);
    ref.current.rotation.fromArray(t.rotation);
    ref.current.scale.fromArray(t.scale);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useFrame((_) => {
    if (!dragged || !transform) return;

    ref.current.matrixWorld.decompose(p, r, s);
    e.setFromQuaternion(r);
    transform.position = [p.x, p.y, p.z];
    transform.rotation = [e.x, e.y, e.z];
    transform.scale = [s.x, s.y, s.z];
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
          onMouseDown={() => drag(true)}
          onMouseUp={() => drag(false)}
        />
      )}
    </>
  );
}
