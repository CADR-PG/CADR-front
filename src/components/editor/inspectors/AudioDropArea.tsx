import DeleteIcon from '@mui/icons-material/Delete';
import { useDrop } from 'react-dnd';
import { DndTypes } from '../../../types/DndTypes';
import { AssetsFile } from '../../../types/Assets';
import useEntityManager from '../../../hooks/useEntityManager';
import { Entity } from '../../../engine/Entity';
import { IconButton } from '@mui/material';
import cAudio from '../../../engine/components/Audio';
import { ComponentType } from '../../../engine/Component';
import { ECS } from '../../../engine/ECS';

interface AudioDropAreaProps<T extends cAudio> {
  entity: Entity;
  componentType: ComponentType<T>;
}

export default function AudioDropArea<T extends cAudio>({
  entity,
  componentType,
}: AudioDropAreaProps<T>) {
  const em = useEntityManager();
  const audio = em.getComponent(componentType, entity);
  const audioWrite = ECS.instance.entityManager.getComponent(
    componentType,
    entity,
  );
  const [{ canDrop }, drop] = useDrop(
    () => ({
      accept: DndTypes.FILE,
      drop: (item: AssetsFile, _monitor) => {
        if (!audioWrite) return;
        audioWrite.source = item.id;
      },
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
        canDrop: !!monitor.canDrop(),
      }),
    }),
    [audioWrite],
  );

  if (!audio) return null;

  return (
    <div ref={drop} className={`drop-area ${canDrop ? 'drop-area--drag' : ''}`}>
      {audio.source}
      <IconButton
        onClick={() => {
          if (!audioWrite) return;
          audioWrite.source = '';
        }}
      >
        <DeleteIcon />
      </IconButton>
    </div>
  );
}
