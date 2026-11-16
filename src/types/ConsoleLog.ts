export type ConsoleLogLevel = 'log' | 'warn' | 'error';

export default interface ConsoleLogEntry {
  id: string;
  level: ConsoleLogLevel;
  message: string;
  timestamp: number;
}
