import { useRef, useState } from 'react';
import useEntityManager from '../../hooks/useEntityManager';
import HierarchyEntity from './HierarchyEntity';
import Parent from '@/engine/components/Parent';
import { Button, Menu, MenuItem } from '@mui/material';
import {
  makeCreateEntityCommand,
  makeDestroyEntityCommand,
  makePasteEntityCommand,
} from '@/engine/Command';
import { ECS } from '@/engine/ECS';
import Name from '@/engine/components/Name';
import Transform from '@/engine/components/Transform';
import { Entity } from '@/engine/Entity';
import { useEditorContext } from '@/hooks/useEditorContext';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import DeleteIcon from '@mui/icons-material/Delete';
import { useClipboardStore } from '@/stores/clipboardStore';

interface ContextMenuState {
  mouseX: number;
  mouseY: number;
  entity: Entity | null;
}

function HierarchyWindow() {
  const em = useEntityManager();
  const { focus } = useEditorContext();
  const parentRef = useRef<HTMLDivElement>(null);
  const [contextMenu, setContextMenu] = useState<ContextMenuState | null>(null);
  const { clipboard, copy } = useClipboardStore();

  const createRoot = () => {
    const command = makeCreateEntityCommand(null, null, (entity) => {
      ECS.instance.entityManager.addComponent(new Name('root'), entity);
      ECS.instance.entityManager.addComponent(new Transform(), entity);
    });
    ECS.instance.entityManager.pushCommand(command);
  };

  const openEntityContextMenu = (event: React.MouseEvent, entity: Entity) => {
    event.preventDefault();
    setContextMenu({
      mouseX: event.clientX + 2,
      mouseY: event.clientY - 6,
      entity,
    });
  };

  const openBackgroundContextMenu = (event: React.MouseEvent) => {
    event.preventDefault();
    setContextMenu({
      mouseX: event.clientX + 2,
      mouseY: event.clientY - 6,
      entity: null,
    });
  };

  const closeContextMenu = () => setContextMenu(null);

  const handleCopy = () => {
    if (contextMenu?.entity) copy(contextMenu.entity);
    closeContextMenu();
  };

  const handleDelete = () => {
    if (contextMenu?.entity) {
      const command = makeDestroyEntityCommand(contextMenu.entity, focus);
      ECS.instance.entityManager.pushCommand(command);
    }
    closeContextMenu();
  };

  const handlePaste = () => {
    const parent = contextMenu?.entity ?? em.getScene().root;
    if (clipboard && parent) {
      const command = makePasteEntityCommand(clipboard, parent, focus);
      ECS.instance.entityManager.pushCommand(command);
    }
    closeContextMenu();
  };

  return (
    <div className="hierarchy-window" ref={parentRef}>
      <h3>Hierarchy</h3>
      <div
        className="hierarchy-window-content"
        onContextMenu={openBackgroundContextMenu}
      >
        <b className="hierarchy-window-content-title">Scene</b>
        {em.getEntities().length > 0 ? (
          <ul className="tree">
            {em
              .getEntities()
              .filter(
                (entity) =>
                  !em.getComponent(Parent, entity) ||
                  !em.getComponent(Parent, entity)?.entity,
              )
              .map((entity) => (
                <HierarchyEntity
                  parent={parentRef.current}
                  entity={entity}
                  key={entity}
                  onContextMenu={openEntityContextMenu}
                />
              ))}
          </ul>
        ) : (
          <div className="hierarchy-window-content-create-button">
            <Button variant="contained" onClick={() => createRoot()}>
              Create root
            </Button>
          </div>
        )}
      </div>
      <Menu
        anchorReference="anchorPosition"
        anchorPosition={
          contextMenu !== null
            ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
            : undefined
        }
        open={contextMenu !== null}
        onClose={closeContextMenu}
        disableRestoreFocus
        disableEnforceFocus
      >
        {contextMenu?.entity && (
          <MenuItem onClick={handleCopy}>
            <ContentCopyIcon fontSize="small" sx={{ mr: 1 }} />
            Copy
          </MenuItem>
        )}
        <MenuItem onClick={handlePaste} disabled={!clipboard}>
          <ContentPasteIcon fontSize="small" sx={{ mr: 1 }} />
          Paste
        </MenuItem>
        {contextMenu?.entity && (
          <MenuItem onClick={handleDelete}>
            <DeleteIcon fontSize="small" sx={{ mr: 1 }} />
            Delete
          </MenuItem>
        )}
      </Menu>
    </div>
  );
}

export default HierarchyWindow;
