import { useEffect, useRef } from 'react';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useConsoleStore } from '../../stores/consoleStore';

function ConsoleWindow() {
  const { logs, clear } = useConsoleStore();
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: 'end' });
  }, [logs.length]);

  return (
    <div className="console-window">
      <div className="console-window__header">
        <h3>Console</h3>
        <IconButton size="small" onClick={clear} title="Clear console">
          <DeleteIcon fontSize="small" />
        </IconButton>
      </div>
      <div className="console-window__log-list">
        {logs.map((entry) => (
          <div
            key={entry.id}
            className={`console-window__entry console-window__entry--${entry.level}`}
          >
            <span className="console-window__time">
              {new Date(entry.timestamp).toLocaleTimeString()}
            </span>
            <span className="console-window__message">{entry.message}</span>
          </div>
        ))}
        <div ref={endRef} />
      </div>
    </div>
  );
}

export default ConsoleWindow;
