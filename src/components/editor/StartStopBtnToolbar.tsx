import PauseIcon from '@mui/icons-material/Pause';
import { grey } from '@mui/material/colors';
import { useEditorContext } from '../../hooks/useEditorContext';
import { IconButton } from '@mui/material';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';

function StartStopBtnToolbar() {
  const { running, setRunning, focus } = useEditorContext();

  return (
    <div className="start-stop-btn-toolbar">
      <IconButton
        onClick={() => {
          setRunning(!running);
          focus(null);
        }}
      >
        {running ? (
          <PauseIcon sx={{ color: grey[500] }} />
        ) : (
          <OndemandVideoIcon sx={{ color: grey[500] }} />
        )}
      </IconButton>
    </div>
  );
}

export default StartStopBtnToolbar;
