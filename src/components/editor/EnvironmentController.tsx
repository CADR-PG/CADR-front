import { Environment } from '@react-three/drei';
import useEntityManager from '@/hooks/useEntityManager';
import cEnvironment from '@/engine/components/Environment';
import { Entity } from '@/engine/Entity';

interface EnvironmentControllerProps {
  entity: Entity;
}

export default function EnvironmentController({
  entity,
}: EnvironmentControllerProps) {
  const em = useEntityManager();
  const environment = em.getComponent(cEnvironment, entity);
  if (!environment) return null;

  return (
    <Environment
      preset={environment.preset}
      background={environment.background}
      environmentIntensity={environment.environmentIntensity}
      environmentRotation={[...environment.environmentRotation]}
      backgroundIntensity={environment.backgroundIntensity}
      backgroundBlurriness={environment.backgroundBlurriness}
      backgroundRotation={[...environment.backgroundRotation]}
      blur={environment.blur}
      ground={environment.ground}
      resolution={environment.resolution}
      frames={environment.frames}
      near={environment.near}
      far={environment.far}
    />
  );
}
