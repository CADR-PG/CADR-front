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
      data: { currentScene: next, scenes: localScenes, game },
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

  console.log('dupa', scenes);

  return !running ? (
    <>
      <div style={{ display: 'flex', background: 'white' }}>
        {scenes.map((s, i) => (
          <div
            style={{
              background: em.currentScene === i ? '#333' : undefined,
              padding: '0 8px 0 8px',
              borderTopRightRadius: '8px',
              borderTopLeftRadius: '8px',
            }}
            key={i}
          >
            <span
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onClick={() => handleClick(i)}
            >
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                {s?.name ?? `New scene`}
                {em.getSceneAt(i) && em.getSceneAt(i).dirty ? (
                  <FiberManualRecordIcon style={{ fontSize: '12px' }} />
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
            </span>
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
