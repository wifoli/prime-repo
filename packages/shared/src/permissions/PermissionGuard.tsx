import { ReactNode } from 'react';
import { usePermission } from './usePermission.ts';
import { PermissionConfig } from './types.ts';

export interface PermissionGuardProps {
  children: ReactNode;
  permissions?: string[];
  roles?: string[];
  requireAll?: boolean;
  fallback?: ReactNode;
}

/**
 * Component to guard content based on permissions/roles
 */
export function PermissionGuard({
  children,
  permissions = [],
  roles = [],
  requireAll = false,
  fallback = null,
}: PermissionGuardProps) {
  const hasPermission = usePermission({
    permissions,
    roles,
    requireAll,
  });

  if (!hasPermission) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}
