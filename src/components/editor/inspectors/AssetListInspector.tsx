import DeleteIcon from '@mui/icons-material/Delete';
import { useDrop } from 'react-dnd';
import { IconButton } from '@mui/material';
import { DndTypes } from '@/types/DndTypes';
import { AssetsFile, AssetsFileMinimal } from '@/types/Assets';
import useEntityManager from '@/hooks/useEntityManager';
import { Entity } from '@/engine/Entity';
import { ECS } from '@/engine/ECS';
import { Component, ComponentType } from '@/engine/Component';
import { makePushArrayCommand, makeRemoveArrayCommand } from '@/engine/Command';

type AssetListKeys<T> = {
  [K in keyof T]: T[K] extends AssetsFileMinimal[] ? K : never;
}[keyof T];

interface AssetListInspectorProps<T extends Component> {
  entity: Entity;
  componentType: ComponentType<T>;
  listKey: AssetListKeys<T>;
  placeholder?: string;
}

export default function AssetListInspector<T extends Component>({
  entity,
  componentType,
  listKey,
  placeholder = 'Drop file here',
}: AssetListInspectorProps<T>) {
  const em = useEntityManager();
  const component = em.getComponent(componentType, entity);
  const write = ECS.instance.entityManager.getComponent(componentType, entity);
  const [{ canDrop }, drop] = useDrop(
    () => ({
      accept: DndTypes.FILE,
      drop: (item: AssetsFile, _monitor) => {
        if (!write) return;
        const list = write[listKey] as AssetsFileMinimal[];
        if (list.some((file) => file.id === item.id)) return;
        const command = makePushArrayCommand(
          { id: item.id, name: item.name },
          list,
        );
        ECS.instance.entityManager.pushCommand(command);
      },
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
        canDrop: !!monitor.canDrop(),
      }),
    }),
    [write, listKey],
  );

  if (!component) return null;
  const files = component[listKey] as readonly AssetsFileMinimal[];

  return (
    <div>
      {files.map((file, index) => (
        <div key={file.id} className="animations-inspector">
          <div>{file.name}</div>
          <IconButton
            onClick={() => {
              if (!write) return;
              const command = makeRemoveArrayCommand(
                index,
                write[listKey] as AssetsFileMinimal[],
              );
              ECS.instance.entityManager.pushCommand(command);
            }}
          >
            <DeleteIcon />
          </IconButton>
        </div>
      ))}
      <div
        ref={(node) => {
          drop(node);
        }}
        className={`component-area drop-area ${canDrop ? 'drop-area--drag' : ''}`}
      >
        {placeholder}
      </div>
    </div>
  );
}
