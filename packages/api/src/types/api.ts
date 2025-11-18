import { AxiosError, AxiosRequestConfig } from 'axios';

// Base API Response
export interface ApiResponse<T = any> {
  data: T;
  message?: string;
  success: boolean;
}

// API Error
export interface ApiError {
  message: string;
  code?: string;
  status?: number;
  errors?: Record<string, string[]>;
}

// Pagination
export interface PaginationParams {
  page?: number;
  limit?: number;
  sort?: string;
  order?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Loading State
export interface LoadingState {
  isLoading: boolean;
  error: ApiError | null;
}

// Request Config
export interface ApiRequestConfig extends AxiosRequestConfig {
  skipAuth?: boolean;
  skipErrorHandling?: boolean;
}

// Custom Axios Error
export type CustomAxiosError = AxiosError<ApiError>;
