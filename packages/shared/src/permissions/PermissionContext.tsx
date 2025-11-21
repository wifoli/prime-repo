import { createContext, useContext, ReactNode } from 'react';
import { User, PermissionConfig } from './types.ts';
import { checkPermission as checkPermissionUtil } from './utils.ts';

interface PermissionContextType {
  user: User | null;
  checkPermission: (config: PermissionConfig) => boolean;
}

const PermissionContext = createContext<PermissionContextType | undefined>(undefined);

export interface PermissionProviderProps {
  children: ReactNode;
  user: User | null;
}

export function PermissionProvider({ children, user }: PermissionProviderProps) {
  const checkPermission = (config: PermissionConfig) => {
    return checkPermissionUtil(user, config);
  };

  return (
    <PermissionContext.Provider value={{ user, checkPermission }}>
      {children}
    </PermissionContext.Provider>
  );
}

export function usePermissionContext() {
  const context = useContext(PermissionContext);
  if (!context) {
    throw new Error('usePermissionContext must be used within PermissionProvider');
  }
  return context;
}
