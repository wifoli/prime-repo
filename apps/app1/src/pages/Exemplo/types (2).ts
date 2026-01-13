/**
 * Types para o módulo de Usuários
 */

export type UserStatus = 'active' | 'inactive' | 'suspended';
export type UserRole = 'admin' | 'user' | 'manager' | 'guest';

/**
 * Interface principal de usuário
 */
export interface User {
  id: number;
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
  status: UserStatus;
  department?: string;
  createdAt: string;
  updatedAt: string;
  lastLogin?: string;
}

/**
 * Filtros para busca de usuários
 */
export interface UserFilters {
  status?: UserStatus;
  role?: UserRole;
  department?: string;
  searchTerm?: string;
  createdFrom?: string;
  createdTo?: string;
}

/**
 * Dados para criação de usuário
 */
export interface CreateUserData {
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
  department?: string;
}

/**
 * Dados para atualização de usuário
 */
export interface UpdateUserData extends Partial<CreateUserData> {
  status?: UserStatus;
}

/**
 * Estatísticas de usuários
 */
export interface UserStats {
  total: number;
  active: number;
  inactive: number;
  suspended: number;
  byRole: Record<UserRole, number>;
  byDepartment: Record<string, number>;
}
