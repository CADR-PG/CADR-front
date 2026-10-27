import { useEffect, useMemo, useRef, useState } from 'react';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import { Button, IconButton, TextField } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutlineOutlined';
import { useConsoleStore } from '../../stores/consoleStore';
import { ConsoleLogLevel } from '../../types/ConsoleLog';

const LEVEL_FILTERS: {
  level: ConsoleLogLevel;
  icon: typeof InfoOutlinedIcon;
  color: string;
  title: string;
}[] = [
  { level: 'log', icon: InfoOutlinedIcon, color: '#475569', title: 'Logs' },
  {
    level: 'warn',
    icon: WarningAmberIcon,
    color: '#d97706',
    title: 'Warnings',
  },
  { level: 'error', icon: ErrorOutlineIcon, color: '#a31621', title: 'Errors' },
];

function ConsoleWindow() {
  const { logs, clear } = useConsoleStore();
  const [filter, setFilter] = useState<string>('');
  const [activeLevels, setActiveLevels] = useState<Set<ConsoleLogLevel>>(
    new Set(['log', 'warn', 'error']),
  );
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: 'end' });
  }, [logs.length]);

  const counts = useMemo(
    () =>
      logs.reduce(
        (acc, log) => {
          acc[log.level]++;
          return acc;
        },
        { log: 0, warn: 0, error: 0 } as Record<ConsoleLogLevel, number>,
      ),
    [logs],
  );

  const toggleLevel = (level: ConsoleLogLevel) => {
    setActiveLevels((prev) => {
      const next = new Set(prev);
      if (next.has(level)) next.delete(level);
      else next.add(level);
      return next;
    });
  };

  return (
    <div className="console-window">
      <div className="console-window__header">
        <h3>Console</h3>
      </div>
      <div className="console-window__log-list">
        {logs
          .filter(
            (log) =>
              activeLevels.has(log.level) && log.message.includes(filter),
          )
          .map((entry) => (
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
      <div className="console-window__footer">
        <IconButton size="small" onClick={clear} title="Clear console">
          <CleaningServicesIcon fontSize="small" />
        </IconButton>
        <TextField
          size="small"
          fullWidth
          placeholder="Filter messages..."
          onChange={(v) => setFilter(v.currentTarget.value)}
          onKeyDown={(e) => {
            e.stopPropagation();
          }}
        />
        <div className="console-window__level-filters">
          {LEVEL_FILTERS.map(({ level, icon: Icon, color, title }) => {
            const active = activeLevels.has(level);
            return (
              <Button
                key={level}
                size="small"
                onClick={() => toggleLevel(level)}
                title={`${title} (${counts[level]})`}
                className={`console-window__level-filter${active ? ' console-window__level-filter--active' : ''}`}
                sx={{ color }}
              >
                <Icon fontSize="small" />
                {counts[level]}
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default ConsoleWindow;
