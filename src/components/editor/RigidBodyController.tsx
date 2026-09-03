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
      ref={ref}
      sensor={rigidBody?.sensor}
      {...physicsHandlers}
      name={entity}
    >
      {children}
    </RigidBody>
  ) : (
    <>{children}</>
  );
}
