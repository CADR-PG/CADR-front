import { useState } from "react";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import { grey } from '@mui/material/colors';

function StartStopBtnToolbar() {
    const [running, setRunning] = useState(false);

    const handleToggle = (): void => {
        setRunning((prev) => !prev);
        console.log(`Tryb: ${!running ? "START" : "STOP"}`);
    };

    return(
        <div className="start_stop_btn_toolbar">
            <button
                className={running ? "running" : "stopped"}
                onClick={() => handleToggle()}
            >
                {running ? <PauseIcon sx={{color: grey[500]}}/> : <PlayArrowIcon sx={{ color: grey[500] }}/>}
            </button>
        </div>
    )
}

export default StartStopBtnToolbar;
