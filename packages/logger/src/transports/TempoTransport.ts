import { TraceSpan } from '../core/types';

export interface TempoTransportConfig {
  endpoint: string;
}

/**
 * Grafana Tempo transport for distributed tracing
 */
export class TempoTransport {
  private config: TempoTransportConfig;
  private spans: Map<string, TraceSpan> = new Map();

  constructor(config: TempoTransportConfig) {
    this.config = config;
  }

  /**
   * Start a new span
   */
  startSpan(name: string, traceId?: string, parentSpanId?: string): TraceSpan {
    const span: TraceSpan = {
      traceId: traceId || this.generateId(),
      spanId: this.generateId(),
      parentSpanId,
      name,
      startTime: Date.now(),
      tags: {},
    };

    this.spans.set(span.spanId, span);
    return span;
  }

  /**
   * End span
   */
  endSpan(spanId: string, tags?: Record<string, any>): void {
    const span = this.spans.get(spanId);
    if (!span) return;

    span.endTime = Date.now();
    if (tags) {
      span.tags = { ...span.tags, ...tags };
    }

    this.sendSpan(span);
    this.spans.delete(spanId);
  }

  /**
   * Send span to Tempo
   */
  private async sendSpan(span: TraceSpan): Promise<void> {
    try {
      await fetch(`${this.config.endpoint}/tempo/api/push`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(span),
      });
    } catch (error) {
      console.error('Failed to send trace to Tempo:', error);
    }
  }

  /**
   * Generate random ID
   */
  private generateId(): string {
    return Math.random().toString(36).substring(2, 15);
  }
}
