import { Transport, LogEntry } from '../core/types';

export interface LokiTransportConfig {
  endpoint: string;
  labels?: Record<string, string>;
  batchSize?: number;
  flushInterval?: number;
}

/**
 * Grafana Loki transport
 */
export class LokiTransport implements Transport {
  name = 'loki';
  private config: Required<LokiTransportConfig>;
  private queue: LogEntry[] = [];
  private flushTimer?: NodeJS.Timeout;

  constructor(config: LokiTransportConfig) {
    this.config = {
      endpoint: config.endpoint,
      labels: config.labels || { app: 'prime-repo' },
      batchSize: config.batchSize || 10,
      flushInterval: config.flushInterval || 5000,
    };

    this.startFlushTimer();
  }

  log(entry: LogEntry): void {
    this.queue.push(entry);

    if (this.queue.length >= this.config.batchSize) {
      this.flush();
    }
  }

  private startFlushTimer(): void {
    this.flushTimer = setInterval(() => {
      if (this.queue.length > 0) {
        this.flush();
      }
    }, this.config.flushInterval);
  }

  private async flush(): Promise<void> {
    if (this.queue.length === 0) return;

    const batch = this.queue.splice(0, this.config.batchSize);

    const streams = batch.map(entry => ({
      stream: {
        ...this.config.labels,
        level: entry.level,
        trace_id: entry.traceId || '',
      },
      values: [[
        String(entry.timestamp * 1000000), // nanoseconds
        JSON.stringify({
          message: entry.message,
          context: entry.context,
          error: entry.error ? {
            message: entry.error.message,
            stack: entry.error.stack,
          } : undefined,
        }),
      ]],
    }));

    try {
      await fetch(`${this.config.endpoint}/loki/api/v1/push`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ streams }),
      });
    } catch (error) {
      console.error('Failed to send logs to Loki:', error);
      // Re-add to queue on failure
      this.queue.unshift(...batch);
    }
  }

  destroy(): void {
    if (this.flushTimer) {
      clearInterval(this.flushTimer);
    }
    this.flush();
  }
}
