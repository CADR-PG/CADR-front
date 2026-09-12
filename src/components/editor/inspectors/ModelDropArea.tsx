import DeleteIcon from '@mui/icons-material/Delete';
import { useDrop } from 'react-dnd';
import { DndTypes } from '../../../types/DndTypes';
import { AssetsFile } from '../../../types/Assets';
import useEntityManager from '../../../hooks/useEntityManager';
import { Entity } from '../../../engine/Entity';
import { IconButton } from '@mui/material';
import { ECS } from '../../../engine/ECS';
import GLTF from '../../../engine/components/GLTF';

interface ModelDropAreaProps {
  entity: Entity;
}

export default function ModelDropArea({ entity }: ModelDropAreaProps) {
  const em = useEntityManager();
  const gltf = em.getComponent(GLTF, entity);
  const gltfWrite = ECS.instance.entityManager.getComponent(GLTF, entity);
  const [{ canDrop }, drop] = useDrop(
    () => ({
      accept: DndTypes.FILE,
      drop: (item: AssetsFile, _monitor) => {
        if (!gltfWrite) return;
        gltfWrite.source = item.id;
      },
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
        canDrop: !!monitor.canDrop(),
      }),
    }),
    [gltfWrite],
  );

  if (!gltf) return null;

  return (
    <div ref={drop} className={`drop-area ${canDrop ? 'drop-area--drag' : ''}`}>
      {gltf.source}
      <IconButton
        onClick={() => {
          if (!gltfWrite) return;
          gltfWrite.source = '';
        }}
      >
        <DeleteIcon />
      </IconButton>
    </div>
  );
}
