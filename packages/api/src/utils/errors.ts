import { AxiosError } from 'axios';
import { ApiError, CustomAxiosError } from '../types';

export function handleApiError(error: AxiosError): ApiError {
    if (error.response) {
        // Server responded with error
        const data = error.response.data as any;

        return {
            message: data?.message || error.message || 'An error occurred',
            code: data?.code || error.code,
            status: error.response.status,
            errors: data?.errors
        };
    } else if (error.request) {
        // Request made but no response
        return {
            message: 'No response from server. Please check your connection.',
            code: 'NETWORK_ERROR',
            status: 0
        };
    } else {
        // Error in request setup
        return {
            message: error.message || 'Failed to make request',
            code: 'REQUEST_ERROR'
        };
    }
}

export function isUnauthorizedError(error: ApiError): boolean {
    return error.status === 401;
}

export function isForbiddenError(error: ApiError): boolean {
    return error.status === 403;
}

export function isServerError(error: ApiError): boolean {
    return !!error.status && error.status >= 500;
}

export function getErrorMessage(error: ApiError): string {
    if (error.errors) {
        // Flatten validation errors
        const messages = Object.values(error.errors).flat();
        return messages.join(', ');
    }
    return error.message;
}