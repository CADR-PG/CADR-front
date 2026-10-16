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
} from '@mui/material';
import { ECS } from '@/engine/ECS';
import { useEditorContext } from '@/hooks/useEditorContext';
import useEntityManager from '@/hooks/useEntityManager';
import useSaveScene from '@/hooks/useSaveScene';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

export default function SceneTabs() {
  const [closingTab, setClosingTab] = useState<number | null>(null!);
  const { scenes, removeScene, game } = useEditorSettingsStore();
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

  const handleClose = (index: number) => {
    const em = ECS.instance.entityManager;
    if (em.getScene() === em.game) return;

    if (em.scenes.length === 1) {
      em.createScene();
    }

    const current = em.currentScene;
    const next =
      index < current || (index === current && current > 0)
        ? current - 1
        : current;

    em.currentScene = next;
    em.scenes = em.scenes.filter((_, i) => i !== index);

    removeScene(index);
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

  const handleClick = (index: number) => {
    console.log('Clicked on:', index);
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
              <IconButton
                onClick={() =>
                  em.getSceneAt(i) && em.getSceneAt(i).dirty
                    ? setClosingTab(i)
                    : handleClose(i)
                }
              >
                <CloseIcon />
              </IconButton>
            </div>
          </div>
        ))}
        <IconButton onClick={handleAdd}>
          <AddIcon />
        </IconButton>
      </div>
      <Dialog
        open={closingTab !== null}
        onClose={() => setClosingTab(null)}
        role="dialog"
      >
        <DialogTitle>Unsaved changes</DialogTitle>
        <DialogContent>
          You have unsaved changes. Are you sure you want to close the scene?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setClosingTab(null)}>Cancel</Button>
          <Button
            onClick={() => {
              handleClose(closingTab!);
              setClosingTab(null);
            }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  ) : null;
}
