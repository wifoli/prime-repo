import { usePermissionContext } from './PermissionContext.tsx';
import { PermissionConfig, Permission, Role } from './types.ts';

/**
 * Hook to check permissions
 */
export function usePermission(config: PermissionConfig): boolean {
  const { checkPermission } = usePermissionContext();
  return checkPermission(config);
}

/**
 * Hook to check if user has any role
 */
export function useHasRole(...roles: Role[]): boolean {
  const { user } = usePermissionContext();
  if (!user) return false;
  return roles.some(role => user.roles.includes(role));
}

/**
 * Hook to check if user has any permission
 */
export function useHasPermission(...permissions: Permission[]): boolean {
  const { user } = usePermissionContext();
  if (!user) return false;
  return permissions.some(perm => user.permissions.includes(perm));
}

/**
 * Hook to get current user
 */
export function useCurrentUser() {
  const { user } = usePermissionContext();
  return user;
}
