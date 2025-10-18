import { useState } from 'react';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import { grey } from '@mui/material/colors';
import { useEditorContext } from '../../hooks/useEditorContext';
import Editor from '../../pages/Editor';

function StartStopBtnToolbar() {
  const {running, setRunning} = useEditorContext();

  return (
    <div className="start-stop-btn-toolbar">
      <button
        onClick={() => setRunning((prev)=>!prev)}
      >
        {running ? (
          <PauseIcon sx={{ color: grey[500] }} />
        ) : (
          <PlayArrowIcon sx={{ color: grey[500] }} />
        )}
      </button>
    </div>
  );
}

export default StartStopBtnToolbar;
