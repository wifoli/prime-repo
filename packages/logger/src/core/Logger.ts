import { LogLevel, LogEntry, LoggerConfig, Transport, MetricEntry, TraceSpan } from './types';

const LOG_LEVELS: Record<LogLevel, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
};

export class Logger {
  private config: Required<LoggerConfig>;
  private currentTraceId?: string;
  private currentSpanId?: string;

  constructor(config: LoggerConfig = {}) {
    this.config = {
      level: config.level || 'info',
      enabled: config.enabled !== false,
      context: config.context || {},
      transports: config.transports || [],
    };
  }

  /**
   * Check if level should be logged
   */
  private shouldLog(level: LogLevel): boolean {
    if (!this.config.enabled) return false;
    return LOG_LEVELS[level] >= LOG_LEVELS[this.config.level];
  }

  /**
   * Create log entry
   */
  private createEntry(level: LogLevel, message: string, context?: Record<string, any>, error?: Error): LogEntry {
    return {
      level,
      message,
      timestamp: Date.now(),
      context: { ...this.config.context, ...context },
      error,
      traceId: this.currentTraceId,
      spanId: this.currentSpanId,
    };
  }

  /**
   * Send log to transports
   */
  private async sendToTransports(entry: LogEntry): Promise<void> {
    const promises = this.config.transports.map(transport => {
      try {
        return Promise.resolve(transport.log(entry));
      } catch (error) {
        console.error(`Transport ${transport.name} failed:`, error);
        return Promise.resolve();
      }
    });

    await Promise.allSettled(promises);
  }

  /**
   * Debug log
   */
  debug(message: string, context?: Record<string, any>): void {
    if (!this.shouldLog('debug')) return;
    const entry = this.createEntry('debug', message, context);
    this.sendToTransports(entry);
  }

  /**
   * Info log
   */
  info(message: string, context?: Record<string, any>): void {
    if (!this.shouldLog('info')) return;
    const entry = this.createEntry('info', message, context);
    this.sendToTransports(entry);
  }

  /**
   * Warn log
   */
  warn(message: string, context?: Record<string, any>): void {
    if (!this.shouldLog('warn')) return;
    const entry = this.createEntry('warn', message, context);
    this.sendToTransports(entry);
  }

  /**
   * Error log
   */
  error(message: string, error?: Error, context?: Record<string, any>): void {
    if (!this.shouldLog('error')) return;
    const entry = this.createEntry('error', message, context, error);
    this.sendToTransports(entry);
  }

  /**
   * Set trace context
   */
  setTraceContext(traceId: string, spanId?: string): void {
    this.currentTraceId = traceId;
    this.currentSpanId = spanId;
  }

  /**
   * Clear trace context
   */
  clearTraceContext(): void {
    this.currentTraceId = undefined;
    this.currentSpanId = undefined;
  }

  /**
   * Add persistent context
   */
  addContext(context: Record<string, any>): void {
    this.config.context = { ...this.config.context, ...context };
  }

  /**
   * Create child logger with additional context
   */
  child(context: Record<string, any>): Logger {
    return new Logger({
      ...this.config,
      context: { ...this.config.context, ...context },
    });
  }

  /**
   * Add transport
   */
  addTransport(transport: Transport): void {
    this.config.transports.push(transport);
  }
}

/**
 * Global logger instance
 */
export const logger = new Logger();
