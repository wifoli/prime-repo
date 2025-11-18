import axios, { CancelTokenSource } from 'axios';

class RequestCancellation {
  private pendingRequests: Map<string, CancelTokenSource> = new Map();

  createCancelToken(key: string): CancelTokenSource {
    // Cancel existing request with same key
    this.cancel(key);

    const source = axios.CancelToken.source();
    this.pendingRequests.set(key, source);
    return source;
  }

  cancel(key: string): void {
    const source = this.pendingRequests.get(key);
    if (source) {
      source.cancel(`Request cancelled: ${key}`);
      this.pendingRequests.delete(key);
    }
  }

  cancelAll(): void {
    this.pendingRequests.forEach((source, key) => {
      source.cancel(`Request cancelled: ${key}`);
    });
    this.pendingRequests.clear();
  }

  remove(key: string): void {
    this.pendingRequests.delete(key);
  }

  isCancelled(error: any): boolean {
    return axios.isCancel(error);
  }
}

export const requestCancellation = new RequestCancellation();
