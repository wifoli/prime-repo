import { useState, useCallback } from 'react';
import { useTableQueryParams } from '../../useTableQueryParams';
import { fetchUsers, createUser, updateUser, deleteUser, fetchUserStats } from '../services/userService';
import type { User, UserFilters, CreateUserData, UpdateUserData, UserStats } from '../types';

/**
 * Hook customizado para gerenciamento de usuários
 * Combina o hook de tabela com operações CRUD
 */
export function useUsers() {
  // Estado local para operações
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [stats, setStats] = useState<UserStats | null>(null);
  const [isLoadingStats, setIsLoadingStats] = useState(false);

  // Hook de tabela com tipagem
  const table = useTableQueryParams<User, UserFilters>({
    fetchFn: fetchUsers,
    initialPageSize: 10,
    initialSortField: 'createdAt',
    initialSortOrder: -1,
    onError: (error) => {
      console.error('Error loading users:', error);
      // Aqui você pode adicionar toast/notification
    },
  });

  // Carrega estatísticas
  const loadStats = useCallback(async () => {
    setIsLoadingStats(true);
    try {
      const data = await fetchUserStats();
      setStats(data);
    } catch (error) {
      console.error('Error loading stats:', error);
    } finally {
      setIsLoadingStats(false);
    }
  }, []);

  // Abre modal de criação
  const openCreateModal = useCallback(() => {
    setSelectedUser(null);
    setModalMode('create');
    setIsModalOpen(true);
  }, []);

  // Abre modal de edição
  const openEditModal = useCallback((user: User) => {
    setSelectedUser(user);
    setModalMode('edit');
    setIsModalOpen(true);
  }, []);

  // Fecha modal
  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedUser(null);
  }, []);

  // Cria usuário
  const handleCreate = useCallback(async (data: CreateUserData) => {
    try {
      await createUser(data);
      table.refetch();
      loadStats();
      closeModal();
      // Adicionar toast de sucesso
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }, [table, loadStats, closeModal]);

  // Atualiza usuário
  const handleUpdate = useCallback(async (id: number, data: UpdateUserData) => {
    try {
      await updateUser(id, data);
      table.refetch();
      loadStats();
      closeModal();
      // Adicionar toast de sucesso
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  }, [table, loadStats, closeModal]);

  // Deleta usuário
  const handleDelete = useCallback(async (id: number) => {
    if (!window.confirm('Tem certeza que deseja deletar este usuário?')) {
      return;
    }

    try {
      await deleteUser(id);
      table.refetch();
      loadStats();
      // Adicionar toast de sucesso
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  }, [table, loadStats]);

  return {
    // Estado da tabela
    ...table,
    
    // Estado do modal
    isModalOpen,
    modalMode,
    selectedUser,
    
    // Estatísticas
    stats,
    isLoadingStats,
    loadStats,
    
    // Ações do modal
    openCreateModal,
    openEditModal,
    closeModal,
    
    // Ações CRUD
    handleCreate,
    handleUpdate,
    handleDelete,
  };
}
