import { makeSetCommand } from '@/engine/Command';
import NavMesh from '@/engine/components/NavMesh';
import { ECS } from '@/engine/ECS';
import { Entity } from '@/engine/Entity';
import useEntityManager from '@/hooks/useEntityManager';
import { AssetsFile } from '@/types/Assets';
import { DndTypes } from '@/types/DndTypes';
import { IconButton } from '@mui/material';
import { useDrop } from 'react-dnd';
import DeleteIcon from '@mui/icons-material/Delete';

interface NavMeshDropArea {
  entity: Entity;
}

export default function NavMeshDropArea({ entity }: NavMeshDropArea) {
  const em = useEntityManager();
  const navMesh = em.getComponent(NavMesh, entity);
  const nmWrite = ECS.instance.entityManager.getComponent(NavMesh, entity);

  const [{ canDrop }, drop] = useDrop(
    () => ({
      accept: DndTypes.FILE,
      drop: (item: AssetsFile, _monitor) => {
        if (!nmWrite) return;
        const command = makeSetCommand(item.id, nmWrite, 'source');
        ECS.instance.entityManager.pushCommand(command);
      },
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
        canDrop: !!monitor.canDrop(),
      }),
    }),
    [nmWrite],
  );

  if (!navMesh) return null;

  return (
    <div
      ref={(node) => {
        drop(node);
      }}
      className={`drop-area ${canDrop ? 'drop-area--drag' : ''}`}
    >
      {navMesh.source}
      <IconButton
        onClick={() => {
          if (!nmWrite) return;
          const command = makeSetCommand('', nmWrite, 'source');
          ECS.instance.entityManager.pushCommand(command);
        }}
      >
        <DeleteIcon />
      </IconButton>
    </div>
  );
}
