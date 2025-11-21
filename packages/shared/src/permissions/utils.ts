import { Permission, Role, PermissionConfig, User } from './types.ts';

/**
 * Check if user has permission
 */
export function checkPermission(
  user: User | null,
  config: PermissionConfig
): boolean {
  if (!user) return false;

  const { roles = [], permissions = [], requireAll = false } = config;

  // Check roles
  const hasRole = requireAll
    ? roles.every(role => user.roles.includes(role))
    : roles.some(role => user.roles.includes(role));

  // Check permissions
  const hasPermission = requireAll
    ? permissions.every(perm => user.permissions.includes(perm))
    : permissions.some(perm => user.permissions.includes(perm));

  // If both roles and permissions are specified
  if (roles.length > 0 && permissions.length > 0) {
    return requireAll ? hasRole && hasPermission : hasRole || hasPermission;
  }

  // Only roles
  if (roles.length > 0) return hasRole;

  // Only permissions
  if (permissions.length > 0) return hasPermission;

  return false;
}

/**
 * Check if user has any of the roles
 */
export function hasRole(user: User | null, ...roles: Role[]): boolean {
  if (!user) return false;
  return roles.some(role => user.roles.includes(role));
}

/**
 * Check if user has all roles
 */
export function hasAllRoles(user: User | null, ...roles: Role[]): boolean {
  if (!user) return false;
  return roles.every(role => user.roles.includes(role));
}

/**
 * Check if user has any of the permissions
 */
export function hasPermission(user: User | null, ...permissions: Permission[]): boolean {
  if (!user) return false;
  return permissions.some(perm => user.permissions.includes(perm));
}

/**
 * Check if user has all permissions
 */
export function hasAllPermissions(user: User | null, ...permissions: Permission[]): boolean {
  if (!user) return false;
  return permissions.every(perm => user.permissions.includes(perm));
}
