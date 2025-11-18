import { axiosInstance } from '../client/axios';
import { tokenManager } from '../utils/token';
import { loadingStateManager } from '../utils/loading';
import { AuthResponse, LoginCredentials, User } from '../types';

class AuthService {
  private readonly endpoint = '/auth';

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    loadingStateManager.startLoading('auth:login');
    
    try {
      const response = await axiosInstance.post<AuthResponse>(
        `${this.endpoint}/login`,
        credentials
      );
      
      const { tokens } = response.data;
      tokenManager.setToken(tokens.accessToken);
      tokenManager.setRefreshToken(tokens.refreshToken);
      
      loadingStateManager.stopLoading('auth:login');
      return response.data;
    } catch (error) {
      loadingStateManager.stopLoading('auth:login', error as any);
      throw error;
    }
  }

  async logout(): Promise<void> {
    loadingStateManager.startLoading('auth:logout');
    
    try {
      await axiosInstance.post(`${this.endpoint}/logout`);
      tokenManager.clearTokens();
      loadingStateManager.stopLoading('auth:logout');
    } catch (error) {
      loadingStateManager.stopLoading('auth:logout', error as any);
      throw error;
    }
  }

  async refreshToken(): Promise<AuthResponse> {
    const refreshToken = tokenManager.getRefreshToken();
    
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    try {
      const response = await axiosInstance.post<AuthResponse>(
        `${this.endpoint}/refresh`,
        { refreshToken }
      );
      
      const { tokens } = response.data;
      tokenManager.setToken(tokens.accessToken);
      tokenManager.setRefreshToken(tokens.refreshToken);
      
      return response.data;
    } catch (error) {
      tokenManager.clearTokens();
      throw error;
    }
  }

  async getCurrentUser(): Promise<User> {
    loadingStateManager.startLoading('auth:currentUser');
    
    try {
      const response = await axiosInstance.get<User>(`${this.endpoint}/me`);
      loadingStateManager.stopLoading('auth:currentUser');
      return response.data;
    } catch (error) {
      loadingStateManager.stopLoading('auth:currentUser', error as any);
      throw error;
    }
  }

  isAuthenticated(): boolean {
    return tokenManager.hasToken();
  }
}

export const authService = new AuthService();
