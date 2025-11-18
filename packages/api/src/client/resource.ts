import { AxiosResponse } from 'axios';
import { axiosInstance } from './axios';
import { loadingStateManager } from '../utils/loading';
import { ApiError, PaginationParams, PaginatedResponse } from '../types';

export interface ResourceConfig {
  loadingKey?: string;
  trackLoading?: boolean;
}

export interface RestMethods<T> {
  list(params?: PaginationParams): Promise<T[]>;
  listPaginated(params?: PaginationParams): Promise<PaginatedResponse<T>>;
  get(id: string | number): Promise<T>;
  create(data: Partial<T>): Promise<T>;
  update(id: string | number, data: Partial<T>): Promise<T>;
  delete(id: string | number): Promise<void>;
}

export type CustomMethods<T> = Record<string, (...args: any[]) => Promise<any>>;

export type Resource<T, C extends CustomMethods<T> = {}> = RestMethods<T> & C;

export function createResource<T, C extends CustomMethods<T> = {}>(
  endpoint: string,
  customMethods?: C,
  config?: ResourceConfig
): Resource<T, C> {
  const loadingKey = config?.loadingKey || endpoint;
  const trackLoading = config?.trackLoading !== false;

  // Helper to wrap requests with loading state
  const withLoading = async <R>(
    operation: string,
    fn: () => Promise<AxiosResponse<R>>
  ): Promise<R> => {
    const key = `${loadingKey}:${operation}`;
    
    if (trackLoading) {
      loadingStateManager.startLoading(key);
    }

    try {
      const response = await fn();
      
      if (trackLoading) {
        loadingStateManager.stopLoading(key);
      }
      
      return response.data;
    } catch (error) {
      if (trackLoading) {
        loadingStateManager.stopLoading(key, error as ApiError);
      }
      throw error;
    }
  };

  // REST Methods
  const restMethods: RestMethods<T> = {
    list: (params) =>
      withLoading('list', () =>
        axiosInstance.get<T[]>(endpoint, { params })
      ),

    listPaginated: (params) =>
      withLoading('listPaginated', () =>
        axiosInstance.get<PaginatedResponse<T>>(endpoint, { params })
      ),

    get: (id) =>
      withLoading('get', () =>
        axiosInstance.get<T>(`${endpoint}/${id}`)
      ),

    create: (data) =>
      withLoading('create', () =>
        axiosInstance.post<T>(endpoint, data)
      ),

    update: (id, data) =>
      withLoading('update', () =>
        axiosInstance.put<T>(`${endpoint}/${id}`, data)
      ),

    delete: (id) =>
      withLoading('delete', () =>
        axiosInstance.delete(`${endpoint}/${id}`)
      )
  };

  // Merge REST methods with custom methods
  return {
    ...restMethods,
    ...(customMethods || {})
  } as Resource<T, C>;
}
