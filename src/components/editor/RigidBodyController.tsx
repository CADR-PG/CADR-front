import { RigidBody } from '@react-three/rapier';
import RBody from '../../engine/components/RigidBody';
import useEntityManager from '../../hooks/useEntityManager';
import ControllerProps from '../../types/ControllerProps';
import { JSX, useRef } from 'react';
import { useEditorContext } from '../../hooks/useEditorContext';
import physicsHandlers from '../../engine/handlers/Physics';

interface RigidBodyControllerProps {
  children: JSX.Element;
}

export default function RigidBodyController({
  entity,
  children,
}: ControllerProps & RigidBodyControllerProps) {
  const em = useEntityManager();
  const rigidBody = em.getComponent(RBody, entity);
  const { running } = useEditorContext();
  const ref = useRef(null!);

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
      colliders={rigidBody.colliders}
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
