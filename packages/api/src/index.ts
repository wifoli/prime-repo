// Client
export { axiosInstance, apiClient, createApiClient } from './client/axios';
export { createResource } from './client/resource';
export type { ApiClientConfig, Resource, RestMethods, CustomMethods, ResourceConfig } from './client';

// Services
export { authService, userService } from './services';

// Utils
export { tokenManager, loadingStateManager, requestCancellation } from './utils';
export { handleApiError, isUnauthorizedError, isForbiddenError, isServerError, getErrorMessage } from './utils/errors';

// Types
export type {
    ApiResponse,
    ApiError,
    PaginationParams,
    PaginatedResponse,
    LoadingState,
    ApiRequestConfig,
    CustomAxiosError
} from './types/api';

export type {
    User,
    CreateUserDto,
    UpdateUserDto,
    AuthTokens,
    LoginCredentials,
    AuthResponse
} from './types/models';