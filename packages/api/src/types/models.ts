// Example models - customize based on your API

export interface User {
    id: string;
    name: string;
    email: string;
    role: 'admin' | 'user';
    createdAt: string;
    updatedAt: string;
}

export interface CreateUserDto {
    name: string;
    email: string;
    password: string;
    role?: 'admin' | 'user';
}

export interface UpdateUserDto {
    name?: string;
    email?: string;
    role?: 'admin' | 'user';
}

export interface AuthTokens {
    accessToken: string;
    refreshToken: string;
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface AuthResponse {
    user: User;
    tokens: AuthTokens;
}