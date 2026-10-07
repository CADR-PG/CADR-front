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

export default function SceneTabs() {
  const [closingTab, setClosingTab] = useState<number | null>(null!);
  const { scenes, removeScene } = useEditorSettingsStore();
  const { focus, camera } = useEditorContext();
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
      data: { currentScene: em.currentScene, scenes: localScenes },
    });
  };

  const handleClose = (index: number) => {
    const em = ECS.instance.entityManager;
    const localScenes = scenes.filter((_, i) => i !== index);
    em.scenes.splice(index, 1);
    removeScene(index);

    if (em.scenes.length === 0) {
      localScenes.push({ id: null, name: null, directoryId: null });
      em.createScene();
    }

    let next = em.currentScene;
    if (
      index < em.currentScene ||
      (index === em.currentScene && em.currentScene > 0)
    ) {
      next = em.currentScene - 1;
    }
    next = Math.min(next, em.scenes.length - 1);
    em.currentScene = next;
    focus(null);

    saveScene({
      id: uuid ? uuid : '',
      data: { currentScene: next, scenes: localScenes },
    });
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
      data: { currentScene: em.currentScene, scenes },
    });
  };

  return (
    <>
      <div style={{ display: 'flex' }}>
        {scenes.map((s, i) => (
          <div key={i}>
            <span onClick={() => handleClick(i)}>
              {em.currentScene === i ? '>' : ''} {s?.name ?? `New scene`}{' '}
              {em.scenes[i] && em.scenes[i].dirty ? '[!]' : ''}
            </span>
            <IconButton
              onClick={() =>
                em.scenes[i] && em.scenes[i].dirty
                  ? setClosingTab(i)
                  : handleClose(i)
              }
            >
              <CloseIcon />
            </IconButton>
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
  );
}
