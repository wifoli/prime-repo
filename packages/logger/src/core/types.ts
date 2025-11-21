export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

export interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: number;
  context?: Record<string, any>;
  error?: Error;
  traceId?: string;
  spanId?: string;
}

export interface LoggerConfig {
  level?: LogLevel;
  enabled?: boolean;
  context?: Record<string, any>;
  transports?: Transport[];
}

export interface Transport {
  name: string;
  log: (entry: LogEntry) => void | Promise<void>;
}

export interface MetricEntry {
  name: string;
  value: number;
  type: 'counter' | 'gauge' | 'histogram';
  labels?: Record<string, string>;
  timestamp: number;
}

export interface TraceSpan {
  traceId: string;
  spanId: string;
  parentSpanId?: string;
  name: string;
  startTime: number;
  endTime?: number;
  tags?: Record<string, any>;
}
