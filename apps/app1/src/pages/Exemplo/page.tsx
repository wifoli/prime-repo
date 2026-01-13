import React from 'react';
import { UsersView } from './view';

/**
 * Página de usuários
 * 
 * Este componente serve como wrapper da view e pode conter:
 * - Providers de contexto
 * - Verificações de permissões
 * - Layouts específicos
 * - Configurações de SEO/Meta tags
 */
export function UsersPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <UsersView />
    </div>
  );
}

export default UsersPage;
