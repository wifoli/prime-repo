import axios, { AxiosInstance } from 'axios';
import { setupInterceptors } from './interceptors';

export interface ApiClientConfig {
  baseURL: string;
  timeout?: number;
  headers?: Record<string, string>;
}

class ApiClient {
  private axiosInstance: AxiosInstance;

  constructor(config: ApiClientConfig) {
    this.axiosInstance = axios.create({
      baseURL: config.baseURL,
      timeout: config.timeout || 30000,
      headers: {
        'Content-Type': 'application/json',
        ...config.headers
      }
    });

    setupInterceptors(this.axiosInstance);
  }

  getInstance(): AxiosInstance {
    return this.axiosInstance;
  }

  updateBaseURL(baseURL: string): void {
    this.axiosInstance.defaults.baseURL = baseURL;
  }

  updateTimeout(timeout: number): void {
    this.axiosInstance.defaults.timeout = timeout;
  }
}

// Default instance (can be configured by apps)
const defaultConfig: ApiClientConfig = {
  baseURL: import.meta.env?.VITE_API_URL || 'http://localhost:3000/api',
  timeout: 30000
};

export const apiClient = new ApiClient(defaultConfig);
export const axiosInstance = apiClient.getInstance();

// Export function to create custom instances
export function createApiClient(config: ApiClientConfig): ApiClient {
  return new ApiClient(config);
}
