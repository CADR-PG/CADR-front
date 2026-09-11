import Material, { MaterialData } from '../../../engine/components/Material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDrop } from 'react-dnd';
import { DndTypes } from '../../../types/DndTypes';
import { AssetsFile } from '../../../types/Assets';
import useDownloadFile from '../../../hooks/useDownloadFile';
import useEntityManager from '../../../hooks/useEntityManager';
import { Entity } from '../../../engine/Entity';
import { normalizeUrl } from '../../../engine/components/helpers/material';
import { IconButton } from '@mui/material';
import cAudio from '../../../engine/components/Audio';

interface AudioSource {
  source: string | undefined;
}

interface AudioDropAreaProps<T extends AudioSource> {
  entity: Entity;
  componentWrite: T;
}

export default function AudioDropArea<T extends AudioSource>({
  entity,
  componentWrite,
}: AudioDropAreaProps<T>) {
  const [{ canDrop }, drop] = useDrop(
    () => ({
      accept: DndTypes.FILE,
      drop: (item: AssetsFile, _monitor) => {
        console.log(item.id);
        componentWrite.source = item.id;
      },
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
        canDrop: !!monitor.canDrop(),
      }),
    }),
    [componentWrite],
  );

  const em = useEntityManager();
  const audio = em.getComponent(cAudio, entity);

  if (!audio) return null;

  return (
    <div ref={drop} className={`drop-area ${canDrop ? 'drop-area--drag' : ''}`}>
      {audio.source}
      <IconButton
        onClick={() => {
          componentWrite[mapType] = '';
        }}
      >
        <DeleteIcon />
      </IconButton>
    </div>
  );
}
