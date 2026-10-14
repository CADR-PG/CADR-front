import { useEditorContext } from '../../hooks/useEditorContext';
import { IconButton } from '@mui/material';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';

function StartStopBtnToolbar() {
  const { running, setRunning, focus } = useEditorContext();

  return (
    <div>
      <IconButton
        disabled={running}
        onClick={async () => {
          await setRunning(true, true);
          focus(null);
        }}
      >
        <OndemandVideoIcon />
      </IconButton>
    </div>
  );
}

export default StartStopBtnToolbar;
