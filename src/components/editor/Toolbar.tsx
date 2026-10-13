import { Checkbox, FormControlLabel, IconButton } from '@mui/material';
import { useEditorContext } from '../../hooks/useEditorContext';
import StartStopBtnToolbar from './StartStopBtnToolbar';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import SettingsBackupRestoreIcon from '@mui/icons-material/SettingsBackupRestore';
import ControlCameraIcon from '@mui/icons-material/ControlCamera';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

function Toolbar() {
  const { editingMode, selectMode } = useEditorContext();

  return (
    <div className="toolbar">
      <div>
        <IconButton
          size="small"
          className={`toolbar-item ${editingMode === 'translate' ? 'active' : ''}`}
          onClick={() => selectMode('translate')}
        >
          <ControlCameraIcon />
        </IconButton>
        <IconButton
          size="small"
          className={`toolbar-item ${editingMode === 'rotate' ? 'active' : ''}`}
          onClick={() => selectMode('rotate')}
        >
          <SettingsBackupRestoreIcon />
        </IconButton>
        <IconButton
          size="small"
          className={`toolbar-item ${editingMode === 'scale' ? 'active' : ''}`}
          onClick={() => selectMode('scale')}
        >
          <OpenInFullIcon />
        </IconButton>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '16px',
        }}
      >
        <PlayArrowIcon />
        <StartStopBtnToolbar />
      </div>
      <div>
        <FormControlLabel label="Main" control={<Checkbox />} />
      </div>
    </div>
  );
}

export default Toolbar;
