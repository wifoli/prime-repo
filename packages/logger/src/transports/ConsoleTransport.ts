import { Transport, LogEntry } from '../core/types';

export interface ConsoleTransportConfig {
  colors?: boolean;
  timestamp?: boolean;
}

/**
 * Console transport for development
 */
export class ConsoleTransport implements Transport {
  name = 'console';
  private config: Required<ConsoleTransportConfig>;

  constructor(config: ConsoleTransportConfig = {}) {
    this.config = {
      colors: config.colors !== false,
      timestamp: config.timestamp !== false,
    };
  }

  log(entry: LogEntry): void {
    const { level, message, timestamp, context, error } = entry;

    // Format timestamp
    const time = this.config.timestamp ? `[${new Date(timestamp).toISOString()}]` : '';

    // Format context
    const ctx = context && Object.keys(context).length > 0 ? JSON.stringify(context) : '';

    // Console method
    const consoleMethod = console[level] || console.log;

    // Log
    if (error) {
      consoleMethod(`${time} [${level.toUpperCase()}] ${message}`, ctx, error);
    } else {
      consoleMethod(`${time} [${level.toUpperCase()}] ${message}`, ctx);
    }
  }
}
