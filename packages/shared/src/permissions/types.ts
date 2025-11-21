export type Permission = string;

export type Role = string;

export interface PermissionConfig {
  roles?: Role[];
  permissions?: Permission[];
  requireAll?: boolean; // true = AND, false = OR
}

export interface User {
  id: string;
  roles: Role[];
  permissions: Permission[];
}
