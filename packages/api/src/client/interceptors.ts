import { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { tokenManager } from '../utils/token';
import { handleApiError, isUnauthorizedError } from '../utils/errors';

export function setupInterceptors(axiosInstance: AxiosInstance) {
  // Request Interceptor
  axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      // Add auth token
      const token = tokenManager.getToken();
      if (token && !config.headers.skipAuth) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      // Remove custom headers
      delete config.headers.skipAuth;

      return config;
    },
    (error: AxiosError) => {
      return Promise.reject(error);
    }
  );

  // Response Interceptor
  axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => {
      // You can transform response here if needed
      return response;
    },
    async (error: AxiosError) => {
      const apiError = handleApiError(error);

      // Handle 401 Unauthorized
      if (isUnauthorizedError(apiError)) {
        // Clear tokens
        tokenManager.clearTokens();
        
        // Optionally redirect to login
        // window.location.href = '/login';
        
        // Or emit event for apps to handle
        window.dispatchEvent(new CustomEvent('auth:unauthorized'));
      }

      return Promise.reject(apiError);
    }
  );
}
