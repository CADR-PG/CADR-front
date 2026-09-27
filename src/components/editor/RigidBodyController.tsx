import { RigidBody } from '@react-three/rapier';
import RBody from '../../engine/components/RigidBody';
import useEntityManager from '../../hooks/useEntityManager';
import ControllerProps from '../../types/ControllerProps';
import { JSX, useRef } from 'react';
import { useEditorContext } from '../../hooks/useEditorContext';
import physicsHandlers from '../../engine/handlers/Physics';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { ECS } from '../../engine/ECS';
import Transform from '../../engine/components/Transform';
import { useMeshContext } from '@/hooks/useMeshContext';
import { applyMatrix, getWorldMatrix, toMatrix } from '@/engine/Hierarchy';
import Parent from '@/engine/components/Parent';

interface RigidBodyControllerProps {
  children: JSX.Element | JSX.Element[];
}

const v = new THREE.Vector3();

const p = new THREE.Vector3();
const r = new THREE.Quaternion();
const s = new THREE.Vector3();
const e = new THREE.Euler();

export default function RigidBodyController({
  entity,
  children,
}: ControllerProps & RigidBodyControllerProps) {
  const em = useEntityManager();
  const rigidBody = em.getComponent(RBody, entity);
  const { running } = useEditorContext();
  const ref = useRef(null!);
  const transformWrite = ECS.instance.entityManager.getComponent(
    Transform,
    entity,
  );
  const parent = em.getComponent(Parent, entity)?.entity;
  const prev = useRef(new THREE.Vector3());
  const { object: mesh } = useMeshContext();

  useFrame(() => {
    if (!running || !transformWrite || !mesh) return;

    mesh.matrixWorld.decompose(p, r, s);
    e.setFromQuaternion(r);

    if (p.distanceToSquared(prev.current) < 1e-6) return;
    prev.current.copy(v);

    const newT = new Transform(
      [p.x, p.y, p.z],
      [r.x, r.y, r.z],
      [s.x, s.y, s.z],
    );
    const world = toMatrix(newT);
    const local = parent
      ? getWorldMatrix(parent).invert().multiply(world)
      : world;
    applyMatrix(transformWrite, local);
  });

  return rigidBody && running ? (
    <RigidBody
      {...physicsHandlers}
      name={entity}
      ref={ref}
      activeCollisionTypes={rigidBody.activeCollisionTypes}
      additionalSolverIterations={rigidBody.additionalSolverIterations}
      angularDamping={rigidBody.angularDamping}
      canSleep={rigidBody.canSleep}
      ccd={rigidBody.ccd}
      colliders={rigidBody.colliders === '' ? undefined : rigidBody.colliders}
      collisionGroups={rigidBody.collisionGroups}
      contactSkin={rigidBody.contactSkin}
      dominanceGroup={rigidBody.dominanceGroup}
      friction={rigidBody.friction}
      gravityScale={rigidBody.gravityScale}
      includeInvisible={rigidBody.includeInvisible}
      mass={rigidBody.mass}
      restitution={rigidBody.restitution}
      sensor={rigidBody.sensor}
      softCcdPrediction={rigidBody.softCcdPrediction}
      type={rigidBody.type}
    >
      {children}
    </RigidBody>
  ) : (
    <>{children}</>
  );
}
