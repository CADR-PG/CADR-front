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
import { useEditorSettingsStore } from '@/stores/editorSettingsStore';
import { useState } from 'react';
import useEntityManager from '@/hooks/useEntityManager';

function PlayButton() {
  const em = useEntityManager();
  const { running, setRunning, focus } = useEditorContext();
  const { game, scenes, setGame } = useEditorSettingsStore();
  const [open, setOpen] = useState(false);

  const handleClick = async () => {
    await setRunning(true, false);
    setOpen(false);
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
            onClick={async () => {
              if (scenes[em.currentScene]) {
                setGame(scenes[em.currentScene]!.id);
                await handleClick();
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
