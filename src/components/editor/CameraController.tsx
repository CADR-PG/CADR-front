import { PerspectiveCamera } from '@react-three/drei';
import { Camera } from '../../engine/components/Camera';
import useEntityManager from '../../hooks/useEntityManager';
import ControllerProps from '../../types/ControllerProps';
import { useEditorContext } from '../../hooks/useEditorContext';
export default function CameraController({ entity }: ControllerProps) {
  const em = useEntityManager();
  const camera = em.getComponent(Camera, entity);
  const { running } = useEditorContext();

  return (
    camera && (
      <PerspectiveCamera
        makeDefault={running}
        args={[camera.fov, camera.aspect, camera.near, camera.far]}
      ></PerspectiveCamera>
    )
  );
}
