import {
  Hud,
  RenderTexture,
  OrthographicCamera,
  Text,
} from '@react-three/drei';
import { ThreeEvent, useFrame, useThree } from '@react-three/fiber';
import { createContext, useContext, useRef, useState } from 'react';
import * as THREE from 'three';

const BOX_SIZE = 25;
const POSITION_OFFSET = 25;

const FaceContext = createContext<number | undefined>(undefined);

function OrientationCube({ matrix = new THREE.Matrix4() }) {
  const mesh = useRef<THREE.Mesh>(null!);
  const [hovered, hover] = useState<number | undefined>(undefined);
  const { camera } = useThree();

  const handlePointerMove = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    hover(e.face?.materialIndex);
  };

  const handlePointerOut = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    hover(-1);
  };

  useFrame(() => {
    // make the ViewCube follow scene camera
    matrix.copy(camera.matrixWorldInverse);
    mesh.current.quaternion.setFromRotationMatrix(matrix);
  });

  return (
    <Hud>
      <OrthographicCamera
        makeDefault
        right={POSITION_OFFSET}
        top={POSITION_OFFSET}
        position={[0, 0, 50]}
      />
      <mesh
        onPointerMove={handlePointerMove}
        onPointerOut={handlePointerOut}
        ref={mesh}
      >
        <boxGeometry args={[BOX_SIZE, BOX_SIZE, BOX_SIZE]} />
        <FaceContext.Provider value={hovered}>
          <FaceMaterial index={0}>front</FaceMaterial>
          <FaceMaterial index={1}>back</FaceMaterial>
          <FaceMaterial index={2}>top</FaceMaterial>
          <FaceMaterial index={3}>bottom</FaceMaterial>
          <FaceMaterial index={4}>left</FaceMaterial>
          <FaceMaterial index={5}>right</FaceMaterial>
        </FaceContext.Provider>
        <ambientLight />
        <pointLight position={[200, 200, 200]} />
      </mesh>
      <ambientLight />
      <pointLight position={[200, 200, 200]} />
    </Hud>
  );
}

interface FaceMaterialProps
  extends React.ComponentProps<'meshStandardMaterial'> {
  children: string;
  index: number;
}

function FaceMaterial({ children, index, ...props }: FaceMaterialProps) {
  const face = useContext(FaceContext);
  return (
    <meshStandardMaterial
      {...props}
      attach={`material-${index}`}
      color={face === index ? 'hotpink' : 'orange'}
    >
      <RenderTexture frames={6} attach="map" anisotropy={16}>
        <color attach="background" args={['white']} />
        <OrthographicCamera
          makeDefault
          left={-1}
          right={1}
          top={1}
          bottom={-1}
          zoom={0.5}
          position={[0, 0, 1]}
        />
        <Text color="black">{children}</Text>
      </RenderTexture>
    </meshStandardMaterial>
  );
}

export default OrientationCube;
