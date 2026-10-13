import PauseIcon from '@mui/icons-material/Pause';
import { grey } from '@mui/material/colors';
import { useEditorContext } from '../../hooks/useEditorContext';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { ECS } from '@/engine/ECS';
import { useEditorSettingsStore } from '@/stores/editorSettingsStore';
import { loadScene } from '@/engine/Scene';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import useEntityManager from '@/hooks/useEntityManager';

function PlayButton() {
  const em = useEntityManager();
  const { running, setRunning, focus } = useEditorContext();
  const { game, scenes, setGame } = useEditorSettingsStore();
  const { uuid } = useParams();
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    if (!running && game) {
      loadScene(uuid!, { id: game, name: 'dummy', directoryId: 'dummy' }, -1);
    }
    const em = ECS.instance.entityManager;
    const temp = em.currentScene;
    em.currentScene = em.savedScene;
    em.savedScene = temp;
    console.log(`current: ${em.currentScene} saved: ${em.savedScene}`);

    setRunning(!running);
    focus(null);
  };

  return (
    <>
      <div>
        <IconButton
          disabled={running}
          onClick={() => {
            if (!game) {
              setOpen(true);
            } else {
              handleClick();
            }
          }}
        >
          <PlayArrowIcon />
        </IconButton>
      </div>
      <Dialog open={open}>
        <DialogTitle>No main scene</DialogTitle>
        <DialogContent>
          You didn't set any scene as main. Do you want to set the current one
          as main?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button
            onClick={() => {
              if (scenes[em.currentScene]) {
                setGame(scenes[em.currentScene]!.id);
                handleClick();
              }
            }}
          >
            Set
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default PlayButton;
