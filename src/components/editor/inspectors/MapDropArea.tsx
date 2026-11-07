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
import { makeSetCommand } from '@/engine/Command';
import { ECS } from '@/engine/ECS';

interface MapDropAreaProps<T extends MaterialData> {
  entity: Entity;
  componentWrite: T;
  mapType: keyof T;
}

export default function MapDropArea<T extends MaterialData>({
  entity,
  componentWrite,
  mapType,
}: MapDropAreaProps<T>) {
  const [{ canDrop }, drop] = useDrop(
    () => ({
      accept: DndTypes.FILE,
      drop: (item: AssetsFile, _monitor) => {
        const command = makeSetCommand(item.id, componentWrite, mapType);
        ECS.instance.entityManager.pushCommand(command);
      },
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
        canDrop: !!monitor.canDrop(),
      }),
    }),
    [componentWrite, mapType],
  );

  const em = useEntityManager();
  const material = em.getComponent(Material, entity);
  const { data } = useDownloadFile(
    material?.data[mapType as keyof MaterialData],
  );
  if (!material) return null;

  return (
    <div
      ref={(node) => {
        drop(node);
      }}
      className={`drop-area ${canDrop ? 'drop-area--drag' : ''}`}
    >
      <img
        src={data ? normalizeUrl(data) : '/public/blank-texture.png'}
        alt=""
        width={64}
        height={64}
        style={{ objectFit: 'cover' }}
      />
      <IconButton
        onClick={() => {
          (componentWrite as Record<keyof T, unknown>)[mapType] = '';
        }}
      >
        <DeleteIcon />
      </IconButton>
    </div>
  );
}
