import { MetricEntry } from '../core/types';

export interface PrometheusTransportConfig {
  endpoint: string;
  jobName?: string;
}

/**
 * Prometheus/Mimir transport for metrics
 */
export class PrometheusTransport {
  private config: Required<PrometheusTransportConfig>;
  private metrics: Map<string, MetricEntry> = new Map();

  constructor(config: PrometheusTransportConfig) {
    this.config = {
      endpoint: config.endpoint,
      jobName: config.jobName || 'prime-repo',
    };
  }

  /**
   * Increment counter
   */
  counter(name: string, value: number = 1, labels?: Record<string, string>): void {
    const key = this.getMetricKey(name, labels);
    const existing = this.metrics.get(key);

    if (existing) {
      existing.value += value;
      existing.timestamp = Date.now();
    } else {
      this.metrics.set(key, {
        name,
        value,
        type: 'counter',
        labels,
        timestamp: Date.now(),
      });
    }
  }

  /**
   * Set gauge value
   */
  gauge(name: string, value: number, labels?: Record<string, string>): void {
    const key = this.getMetricKey(name, labels);
    this.metrics.set(key, {
      name,
      value,
      type: 'gauge',
      labels,
      timestamp: Date.now(),
    });
  }

  /**
   * Record histogram value
   */
  histogram(name: string, value: number, labels?: Record<string, string>): void {
    const key = this.getMetricKey(name, labels);
    this.metrics.set(key, {
      name,
      value,
      type: 'histogram',
      labels,
      timestamp: Date.now(),
    });
  }

  /**
   * Push metrics to Prometheus/Mimir
   */
  async push(): Promise<void> {
    if (this.metrics.size === 0) return;

    const lines: string[] = [];

    this.metrics.forEach(metric => {
      const labels = metric.labels
        ? `{${Object.entries(metric.labels).map(([k, v]) => `${k}="${v}"`).join(',')}}`
        : '';
      
      lines.push(`${metric.name}${labels} ${metric.value} ${metric.timestamp}`);
    });

    try {
      await fetch(`${this.config.endpoint}/api/v1/push`, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain' },
        body: lines.join('\n'),
      });
    } catch (error) {
      console.error('Failed to push metrics:', error);
    }
  }

  /**
   * Get metric key for deduplication
   */
  private getMetricKey(name: string, labels?: Record<string, string>): string {
    const labelsStr = labels ? JSON.stringify(labels) : '';
    return `${name}:${labelsStr}`;
  }
}
