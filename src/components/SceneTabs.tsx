import { useEditorSettingsStore } from '@/stores/editorSettingsStore';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material';
import { ECS } from '@/engine/ECS';
import { useEditorContext } from '@/hooks/useEditorContext';
import useEntityManager from '@/hooks/useEntityManager';
import useSaveScene from '@/hooks/useSaveScene';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

interface ContextMenuState {
  mouseX: number;
  mouseY: number;
  index: number;
}

export default function SceneTabs() {
  const [closingTabs, setClosingTabs] = useState<number[] | null>(null);
  const [contextMenu, setContextMenu] = useState<ContextMenuState | null>(null);
  const { scenes, removeScenes, game } = useEditorSettingsStore();
  const { focus, camera, running } = useEditorContext();
  const { mutate: saveScene } = useSaveScene();
  const { uuid } = useParams();
  const em = useEntityManager();

  const handleAdd = () => {
    const em = ECS.instance.entityManager;
    ECS.instance.entityManager.createScene();
    const localScenes = [
      ...scenes,
      { id: null, name: null, directoryId: null },
    ];

    saveScene({
      id: uuid ? uuid : '',
      data: { currentScene: em.currentScene, scenes: localScenes, game },
    });
  };

  const handleClose = (indices: number[]) => {
    const em = ECS.instance.entityManager;
    if (em.getScene() === em.game) return;
    if (indices.length === 0) return;

    if (em.scenes.length === indices.length) {
      em.createScene();
    }

    // If the current scene gets closed, fall back to the nearest remaining
    // tab before it, or the first remaining tab if there is none.
    const current = em.currentScene;
    const kept = em.scenes.map((_, i) => i).filter((i) => !indices.includes(i));
    const target = indices.includes(current)
      ? (kept.filter((i) => i < current).pop() ?? kept[0])
      : current;
    const next = kept.indexOf(target);

    em.currentScene = next;
    em.scenes = em.scenes.filter((_, i) => !indices.includes(i));

    removeScenes(indices);
    focus(null);

    saveScene({
      id: uuid ? uuid : '',
      data: {
        currentScene: next,
        scenes: useEditorSettingsStore.getState().scenes,
        game,
      },
    });
  };

  // Ask for confirmation if any of the scenes being closed has unsaved changes.
  const requestClose = (indices: number[]) => {
    if (indices.some((i) => em.getSceneAt(i)?.dirty)) {
      setClosingTabs(indices);
    } else {
      handleClose(indices);
    }
  };

  const handleClick = (index: number) => {
    const em = ECS.instance.entityManager;

    em.getScene().lastCameraPosition = [
      camera.position.x,
      camera.position.y,
      camera.position.z,
    ];
    em.currentScene = index;
    focus(null);

    // update project settings
    saveScene({
      id: uuid ? uuid : '',
      data: { currentScene: em.currentScene, scenes, game },
    });
  };

  const openContextMenu = (event: React.MouseEvent, index: number) => {
    event.preventDefault();
    event.stopPropagation();
    setContextMenu({
      mouseX: event.clientX + 2,
      mouseY: event.clientY - 6,
      index,
    });
  };

  const closeContextMenu = () => setContextMenu(null);

  const handleMenuClose = (getIndices: (index: number) => number[]) => {
    if (contextMenu === null) return;
    const indices = getIndices(contextMenu.index);
    closeContextMenu();
    requestClose(indices);
  };

  const truncName = (name: string) => {
    const MAX_LENGTH = 15;
    const EXTENSION_LENGTH = 6;
    if (name.length > MAX_LENGTH) {
      return name.slice(0, MAX_LENGTH - 1) + '...';
    }
    return name.slice(0, name.length - EXTENSION_LENGTH);
  };

  return !running ? (
    <>
      <div className="scene-tabs-container">
        {scenes.map((s, i) => (
          <div
            className={`scene-tabs-container-tab ${em.currentScene === i ? 'scene-tabs-container-tab-active' : ''}`}
            key={i}
            onContextMenu={(e) => openContextMenu(e, i)}
          >
            <div className="scene-tabs-container-tab-content">
              <div
                className="scene-tabs-container-tab-content-name"
                onClick={() => handleClick(i)}
              >
                {s?.name ? truncName(s.name) : `New scene`}
                {em.getSceneAt(i) && em.getSceneAt(i).dirty ? (
                  <FiberManualRecordIcon className="save-icon" />
                ) : null}
              </div>
              <IconButton onClick={() => requestClose([i])}>
                <CloseIcon />
              </IconButton>
            </div>
          </div>
        ))}
        <IconButton onClick={handleAdd}>
          <AddIcon />
        </IconButton>
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
        <MenuItem onClick={() => handleMenuClose((index) => [index])}>
          Close
        </MenuItem>
        <MenuItem
          disabled={contextMenu?.index === 0}
          onClick={() =>
            handleMenuClose((index) =>
              scenes.map((_, i) => i).filter((i) => i < index),
            )
          }
        >
          Close Tabs to the Left
        </MenuItem>
        <MenuItem
          disabled={contextMenu?.index === scenes.length - 1}
          onClick={() =>
            handleMenuClose((index) =>
              scenes.map((_, i) => i).filter((i) => i > index),
            )
          }
        >
          Close Tabs to the Right
        </MenuItem>
      </Menu>
      <Dialog
        open={closingTabs !== null}
        onClose={() => setClosingTabs(null)}
        role="dialog"
      >
        <DialogTitle>Unsaved changes</DialogTitle>
        <DialogContent>
          You have unsaved changes. Are you sure you want to close
          {closingTabs && closingTabs.length > 1
            ? ' these scenes'
            : ' the scene'}
          ?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setClosingTabs(null)}>Cancel</Button>
          <Button
            onClick={() => {
              handleClose(closingTabs!);
              setClosingTabs(null);
            }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  ) : null;
}
