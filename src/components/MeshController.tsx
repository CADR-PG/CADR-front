import ControllerProps from '../types/ControllerProps';
import { useMesh } from '../hooks/useMesh';
import { Helper, Outlines } from '@react-three/drei';
import { BoxHelper } from 'three';

function GenericMesh({ children, objectUuid, ...props }: ControllerProps) {
  const {
    focused,
    hovered,
    handleRef,
    handleClick,
    handlePointerOver,
    handlePointerOut,
  } = useMesh(objectUuid);

  return (
    <mesh
      {...props}
      ref={handleRef}
      onClick={handleClick}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
    >
      {children}
      {hovered ? <Outlines thickness={2} color="yellow" /> : null}
      {objectUuid == focused ? (
        <Helper type={BoxHelper} args={['yellow']} />
      ) : null}
    </mesh>
  );
}

export default GenericMesh;
