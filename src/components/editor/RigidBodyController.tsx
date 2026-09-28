import {
  RapierRigidBody,
  RigidBody,
  useAfterPhysicsStep,
} from '@react-three/rapier';
import RBody from '../../engine/components/RigidBody';
import useEntityManager from '../../hooks/useEntityManager';
import ControllerProps from '../../types/ControllerProps';
import { JSX, useRef, useState } from 'react';
import { useEditorContext } from '../../hooks/useEditorContext';
import physicsHandlers from '../../engine/handlers/Physics';
import * as THREE from 'three';
import { ECS } from '../../engine/ECS';
import Transform from '../../engine/components/Transform';
import { useMeshContext } from '@/hooks/useMeshContext';
import {
  applyMatrix,
  flattenHierarchy,
  getWorldMatrix,
  getWorldTransformOmitRoot,
  isInRigidBody,
  toMatrix,
} from '@/engine/Hierarchy';
import Parent from '@/engine/components/Parent';
import useWorldTransform from '@/hooks/useWorldTransform';
import Children from '@/engine/components/Children';
import Collider from '@/engine/components/Collider';
import ComponentNames from '@/data/ComponentNames';

interface RigidBodyControllerProps {
  children: JSX.Element | JSX.Element[];
}

const p = new THREE.Vector3();
const r = new THREE.Quaternion();
const s = new THREE.Vector3();
const e = new THREE.Euler();

// NOTE: this component is a smoking pile of garbage. proceed with caution.
export default function RigidBodyController({
  entity,
  children,
}: ControllerProps & RigidBodyControllerProps) {
  const em = useEntityManager();
  const rigidBody = em.getComponent(RBody, entity);
  const { running } = useEditorContext();
  const ref = useRef<RapierRigidBody>(null!);
  const t = useWorldTransform(entity);
  const transformWrite = ECS.instance.entityManager.getComponent(
    Transform,
    entity,
  );
  const parent = em.getComponent(Parent, entity)?.entity;
  const { object: mesh } = useMeshContext();
  // component mounts on running, initial position will be overwritten
  // when starting the game again
  const [initial] = useState(() => t);

  // sync Transform component with real transformation based on physics
  useAfterPhysicsStep(() => {
    if (
      !rigidBody ||
      !ref.current ||
      !running ||
      !transformWrite ||
      !mesh ||
      !initial
    )
      return;

    const tr = ref.current.translation();
    const ro = ref.current.rotation();
    p.set(tr.x, tr.y, tr.z);
    r.set(ro.x, ro.y, ro.z, ro.w);
    s.fromArray(initial.scale);
    e.setFromQuaternion(r);

    const newT = new Transform(
      [p.x, p.y, p.z],
      [e.x, e.y, e.z],
      [s.x, s.y, s.z],
    );
    const world = toMatrix(newT);
    const local = parent
      ? getWorldMatrix(parent).invert().multiply(world)
      : world;
    applyMatrix(transformWrite, local);
    world.decompose(mesh.position, mesh.quaternion, mesh.scale);
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
      includeInvisible={true}
      mass={rigidBody.mass}
      restitution={rigidBody.restitution}
      sensor={rigidBody.sensor}
      softCcdPrediction={rigidBody.softCcdPrediction}
      type={rigidBody.type}
      position={initial.position}
      rotation={initial.rotation}
      scale={initial.scale}
    >
      <mesh geometry={mesh.geometry} scale={[1, 1, 1]} visible={false} />
      {children}
      {flattenHierarchy(entity).map((collider) => {
        const c = ECS.instance.entityManager.getComponent(Collider, collider);
        const tr = getWorldTransformOmitRoot(collider);
        if (!c || !c.element) return null;

        const ColliderComponent = ComponentNames[c.element];
        return (
          // making a new group is dumb I think but whatever
          <group position={tr.position} rotation={tr.rotation} scale={tr.scale}>
            <ColliderComponent entity={collider} />;
          </group>
        );
      })}
    </RigidBody>
  ) : !isInRigidBody(entity) ? (
    <object3D
      position={t.position}
      rotation={t.rotation}
      scale={t.scale}
      visible={false}
    >
      {children}
    </object3D>
  ) : null;
}
