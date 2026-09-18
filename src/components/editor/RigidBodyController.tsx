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

interface RigidBodyControllerProps {
  children: JSX.Element[];
  mesh: THREE.Object3D | null;
}

const v = new THREE.Vector3();

export default function RigidBodyController({
  entity,
  children,
  mesh,
}: ControllerProps & RigidBodyControllerProps) {
  const em = useEntityManager();
  const rigidBody = em.getComponent(RBody, entity);
  const { running } = useEditorContext();
  const ref = useRef(null!);
  const transformWrite = ECS.instance.entityManager.getComponent(
    Transform,
    entity,
  );
  const prev = useRef(new THREE.Vector3());

  useFrame(() => {
    if (!running || !transformWrite || !mesh) return;
    v.setFromMatrixPosition(mesh.matrixWorld);
    if (v.distanceToSquared(prev.current) < 1e-6) return;
    prev.current.copy(v);
    transformWrite.position = [v.x, v.y, v.z];
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
