import { IconButton } from '@mui/material';
import { useEditorContext } from '../../hooks/useEditorContext';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import SettingsBackupRestoreIcon from '@mui/icons-material/SettingsBackupRestore';
import ControlCameraIcon from '@mui/icons-material/ControlCamera';
import SetGameComponent from './SetGameComponent';

function Toolbar() {
  const { editingMode, selectMode, running } = useEditorContext();

  return !running ? (
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
      <div></div>
      <SetGameComponent />
    </div>
  ) : null;
}

export default Toolbar;
