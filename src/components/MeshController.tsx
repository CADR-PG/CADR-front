import ControllerProps from '../types/ControllerProps';
import { useMesh } from '../hooks/useMesh';
import { Helper, Outlines } from '@react-three/drei';
import { BoxHelper } from 'three';

function GenericMesh({ children, objectUuid, ...props }: ControllerProps) {
  const [hovered, hover] = useState(false);
  const [clicked, click] = useState(false);
  const { focus, setSceneObjects } = useEditorContext();

  const handleClick = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    click(!clicked);
    focus(objectUuid);
  };

  const handlePointerOver = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    hover(true);
  };

  const handlePointerOut = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    hover(false);
  };

  const handleRef = useCallback(
    (node: THREE.Mesh) => {
      setSceneObjects((prevObjects) => ({
        ...prevObjects,
        [objectUuid]: {
          ...prevObjects[objectUuid],
          ref: node,
        },
      }));
    },
    [objectUuid, setSceneObjects],
  );

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
