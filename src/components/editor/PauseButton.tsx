import { useEditorContext } from '@/hooks/useEditorContext';
import PauseIcon from '@mui/icons-material/Pause';
import { IconButton } from '@mui/material';

export default function PauseButton() {
  const { running, setRunning } = useEditorContext();
  return (
    <div>
      <IconButton disabled={!running}>
        <PauseIcon onClick={async () => await setRunning(false, null)} />
      </IconButton>
    </div>
  );
}
