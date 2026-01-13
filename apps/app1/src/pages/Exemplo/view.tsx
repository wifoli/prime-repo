import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Tag } from 'primereact/tag';
import { Card } from 'primereact/card';
import { Skeleton } from 'primereact/skeleton';
import { UserFiltersComponent } from '../components/Filters';
import { UserForm } from '../components/UserForm';
import { useUsers } from '../hooks';
import type { User, UserStatus, UserRole } from '../types';

/**
 * Template para coluna de status
 */
function StatusTemplate({ status }: { status: UserStatus }) {
  const severityMap: Record<UserStatus, 'success' | 'warning' | 'danger'> = {
    active: 'success',
    inactive: 'warning',
    suspended: 'danger',
  };

  const labelMap: Record<UserStatus, string> = {
    active: 'Ativo',
    inactive: 'Inativo',
    suspended: 'Suspenso',
  };

  return (
    <Tag 
      value={labelMap[status]} 
      severity={severityMap[status]} 
      rounded 
    />
  );
}

/**
 * Template para coluna de role
 */
function RoleTemplate({ role }: { role: UserRole }) {
  const severityMap: Record<UserRole, 'info' | 'success' | 'warning' | 'secondary'> = {
    admin: 'danger',
    manager: 'warning',
    user: 'info',
    guest: 'secondary',
  };

  const labelMap: Record<UserRole, string> = {
    admin: 'Admin',
    manager: 'Gerente',
    user: 'Usuário',
    guest: 'Convidado',
  };

  return (
    <Tag 
      value={labelMap[role]} 
      severity={severityMap[role]} 
    />
  );
}

/**
 * Template para ações da tabela
 */
function ActionsTemplate({ 
  user, 
  onEdit, 
  onDelete 
}: { 
  user: User; 
  onEdit: (user: User) => void;
  onDelete: (id: number) => void;
}) {
  return (
    <div className="flex gap-2">
      <Button
        icon="pi pi-pencil"
        rounded
        outlined
        severity="info"
        onClick={() => onEdit(user)}
        tooltip="Editar"
        tooltipOptions={{ position: 'top' }}
      />
      <Button
        icon="pi pi-trash"
        rounded
        outlined
        severity="danger"
        onClick={() => onDelete(user.id)}
        tooltip="Excluir"
        tooltipOptions={{ position: 'top' }}
      />
    </div>
  );
}

/**
 * Cards de estatísticas
 */
function StatsCards() {
  const { stats, isLoadingStats } = useUsers();

  if (isLoadingStats) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[1, 2, 3, 4].map(i => (
          <Card key={i}>
            <Skeleton height="80px" />
          </Card>
        ))}
      </div>
    );
  }

  if (!stats) return null;

  const cards = [
    {
      title: 'Total',
      value: stats.total,
      icon: 'pi-users',
      color: 'text-blue-500',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Ativos',
      value: stats.active,
      icon: 'pi-check-circle',
      color: 'text-green-500',
      bgColor: 'bg-green-50',
    },
    {
      title: 'Inativos',
      value: stats.inactive,
      icon: 'pi-minus-circle',
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-50',
    },
    {
      title: 'Suspensos',
      value: stats.suspended,
      icon: 'pi-ban',
      color: 'text-red-500',
      bgColor: 'bg-red-50',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {cards.map((card, index) => (
        <Card key={index} className="shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-gray-500 text-sm mb-1">{card.title}</div>
              <div className="text-2xl font-bold">{card.value}</div>
            </div>
            <div className={`${card.bgColor} ${card.color} w-12 h-12 rounded-full flex items-center justify-center`}>
              <i className={`pi ${card.icon} text-xl`} />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}

/**
 * View principal da página de usuários
 */
export function UsersView() {
  const {
    // Tabela
    tableState,
    data,
    totalRecords,
    isLoading,
    onPage,
    onSort,
    setCustomFilters,
    resetFilters,
    
    // Modal
    isModalOpen,
    modalMode,
    selectedUser,
    openCreateModal,
    openEditModal,
    closeModal,
    
    // CRUD
    handleCreate,
    handleUpdate,
    handleDelete,
    
    // Stats
    loadStats,
  } = useUsers();

  // Carrega stats ao montar
  React.useEffect(() => {
    loadStats();
  }, [loadStats]);

  // Handler do formulário
  const handleFormSubmit = async (data: any) => {
    if (modalMode === 'create') {
      await handleCreate(data);
    } else if (selectedUser) {
      await handleUpdate(selectedUser.id, data);
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Usuários</h1>
            <p className="text-gray-600 mt-1">
              Gerencie os usuários do sistema
            </p>
          </div>
          <Button
            label="Novo Usuário"
            icon="pi pi-plus"
            onClick={openCreateModal}
          />
        </div>
      </div>

      {/* Stats */}
      <StatsCards />

      {/* Filtros */}
      <div className="mb-6">
        <UserFiltersComponent
          filters={tableState.customFilters || {}}
          onFiltersChange={setCustomFilters}
          onReset={resetFilters}
        />
      </div>

      {/* Tabela */}
      <Card>
        <DataTable
          value={data}
          lazy
          paginator
          rows={tableState.rows}
          first={tableState.first}
          totalRecords={totalRecords}
          onPage={onPage}
          onSort={onSort}
          sortField={tableState.sortField}
          sortOrder={tableState.sortOrder}
          loading={isLoading}
          emptyMessage="Nenhum usuário encontrado"
          rowsPerPageOptions={[5, 10, 25, 50]}
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} usuários"
        >
          <Column 
            field="id" 
            header="ID" 
            sortable 
            style={{ width: '80px' }}
          />
          <Column 
            field="name" 
            header="Nome" 
            sortable 
          />
          <Column 
            field="email" 
            header="Email" 
            sortable 
          />
          <Column 
            field="phone" 
            header="Telefone" 
          />
          <Column 
            field="role" 
            header="Perfil" 
            sortable
            body={(rowData: User) => <RoleTemplate role={rowData.role} />}
          />
          <Column 
            field="status" 
            header="Status" 
            sortable
            body={(rowData: User) => <StatusTemplate status={rowData.status} />}
          />
          <Column 
            field="department" 
            header="Departamento" 
            sortable
          />
          <Column 
            header="Ações"
            body={(rowData: User) => (
              <ActionsTemplate
                user={rowData}
                onEdit={openEditModal}
                onDelete={handleDelete}
              />
            )}
            style={{ width: '120px' }}
          />
        </DataTable>
      </Card>

      {/* Modal de formulário */}
      <UserForm
        visible={isModalOpen}
        mode={modalMode}
        user={selectedUser}
        onHide={closeModal}
        onSubmit={handleFormSubmit}
      />
    </div>
  );
}
