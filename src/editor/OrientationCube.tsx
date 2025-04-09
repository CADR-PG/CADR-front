import { Hud, PerspectiveCamera, RenderTexture, OrthographicCamera, Text } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from 'three';

enum Face {
  FRONT = 0,
  BACK = 1,
  TOP = 2,
  BOTTOM = 3,
  LEFT = 4,
  RIGHT = 5,
}

function OrientationCube({matrix = new THREE.Matrix4}) {
  const mesh = useRef<THREE.Mesh>(null!);
  const { camera, scene } = useThree();

  useFrame(() => {
    matrix.copy(camera.matrix).invert();
    mesh.current.quaternion.setFromRotationMatrix(matrix);
  })

  const handleFaceClick = (faceId: number | undefined) => {
    switch (faceId) {
      case Face.FRONT:
        break;
      case Face.BACK:
        break;
      case Face.TOP:
        break;
      case Face.BOTTOM:
        break;
      case Face.LEFT:
        break;
      case Face.RIGHT:
        break;
      default:
        break;
    }
  }

  return (
    <Hud>
      <OrthographicCamera makeDefault position={[-650, -300, 100]} />
      <mesh onClick={(event) => handleFaceClick(event.face?.materialIndex)} ref={mesh}>
        <boxGeometry args={[50, 50, 50]} />
        <FaceMaterial index={0}>front</FaceMaterial>
        <FaceMaterial index={1}>back</FaceMaterial>
        <FaceMaterial index={2}>top</FaceMaterial>
        <FaceMaterial index={3}>bottom</FaceMaterial>
        <FaceMaterial index={4}>left</FaceMaterial>
        <FaceMaterial index={5}>right</FaceMaterial>
        <ambientLight />
        <pointLight position={[200, 200, 200]} />
      </mesh>
      <ambientLight />
      <pointLight position={[200, 200, 200]} />
    </Hud>
  )
}

interface FaceMaterialProps extends React.ComponentProps<'meshStandardMaterial'> {
  children: string;
  index: number;
}

function FaceMaterial({children, index, ...props}: FaceMaterialProps) {
  return (
    <meshStandardMaterial
      {...props}
      attach={`material-${index}`}
    >
      <RenderTexture frames={6} attach='map' anisotropy={16}>
        <color attach='background' args={['hotpink']} />
        <OrthographicCamera makeDefault
          left={-1}
          right={1}
          top={1}
          bottom={-1}
          zoom={0.5}
          position={[0, 0, 1]}
        />
        <Text color='black'>
          {children}
        </Text>
       </RenderTexture>
    </meshStandardMaterial>
  )
}

export default OrientationCube;
