import ControllerProps from '../types/ControllerProps';
import { useMesh } from '../hooks/useMesh';
import HighlightHelper from './HighlightHelper';
import useComponents from '../hooks/useComponents';
import MeshControllerTemplate from './MeshControllerTemplate';
import useEntityManager from '../hooks/useEntityManager';
import Mesh from '../engine/components/Mesh';

export default function MeshController({ entity, ...props }: ControllerProps) {
  const { setRef, MaterialComponent, GeometryComponent } =
    useComponents(entity);
  const { focused, running, handleClick, handlePointerOver, handlePointerOut } =
    useMesh(entity);
  const em = useEntityManager();
  const mesh = em.getComponent(Mesh, entity);

  return (
    <MeshControllerTemplate entity={entity}>
      <mesh
        {...props}
        onClick={handleClick}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        ref={setRef}
        castShadow={mesh ? mesh.castShadow : false}
        receiveShadow={mesh ? mesh.receiveShadow : false}
      >
        <HighlightHelper entity={entity} focused={!running ? focused : ''} />
        <MaterialComponent entity={entity} />
        <GeometryComponent entity={entity} />
      </mesh>
    </MeshControllerTemplate>
  );
}
