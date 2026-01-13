import React from 'react';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import type { UserFilters, UserStatus, UserRole } from '../types';

interface UserFiltersComponentProps {
  filters: UserFilters;
  onFiltersChange: (filters: Partial<UserFilters>) => void;
  onReset: () => void;
}

const statusOptions: { label: string; value: UserStatus }[] = [
  { label: 'Ativo', value: 'active' },
  { label: 'Inativo', value: 'inactive' },
  { label: 'Suspenso', value: 'suspended' },
];

const roleOptions: { label: string; value: UserRole }[] = [
  { label: 'Admin', value: 'admin' },
  { label: 'Usuário', value: 'user' },
  { label: 'Gerente', value: 'manager' },
  { label: 'Convidado', value: 'guest' },
];

const departmentOptions = [
  { label: 'Engineering', value: 'Engineering' },
  { label: 'Sales', value: 'Sales' },
  { label: 'Marketing', value: 'Marketing' },
  { label: 'HR', value: 'HR' },
];

/**
 * Componente de filtros para tabela de usuários
 */
export function UserFiltersComponent({ 
  filters, 
  onFiltersChange, 
  onReset 
}: UserFiltersComponentProps) {
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFiltersChange({ searchTerm: e.target.value || undefined });
  };

  const handleStatusChange = (value: UserStatus | null) => {
    onFiltersChange({ status: value || undefined });
  };

  const handleRoleChange = (value: UserRole | null) => {
    onFiltersChange({ role: value || undefined });
  };

  const handleDepartmentChange = (value: string | null) => {
    onFiltersChange({ department: value || undefined });
  };

  const handleDateFromChange = (value: Date | null) => {
    onFiltersChange({ 
      createdFrom: value ? value.toISOString() : undefined 
    });
  };

  const handleDateToChange = (value: Date | null) => {
    onFiltersChange({ 
      createdTo: value ? value.toISOString() : undefined 
    });
  };

  const hasActiveFilters = Object.values(filters).some(v => v !== undefined);

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {/* Busca */}
        <div className="flex flex-col gap-2">
          <label htmlFor="search" className="text-sm font-medium text-gray-700">
            Buscar
          </label>
          <span className="p-input-icon-left w-full">
            <i className="pi pi-search" />
            <InputText
              id="search"
              value={filters.searchTerm || ''}
              onChange={handleSearchChange}
              placeholder="Nome, email ou telefone"
              className="w-full"
            />
          </span>
        </div>

        {/* Status */}
        <div className="flex flex-col gap-2">
          <label htmlFor="status" className="text-sm font-medium text-gray-700">
            Status
          </label>
          <Dropdown
            id="status"
            value={filters.status || null}
            onChange={(e) => handleStatusChange(e.value)}
            options={statusOptions}
            placeholder="Todos"
            showClear
            className="w-full"
          />
        </div>

        {/* Role */}
        <div className="flex flex-col gap-2">
          <label htmlFor="role" className="text-sm font-medium text-gray-700">
            Perfil
          </label>
          <Dropdown
            id="role"
            value={filters.role || null}
            onChange={(e) => handleRoleChange(e.value)}
            options={roleOptions}
            placeholder="Todos"
            showClear
            className="w-full"
          />
        </div>

        {/* Department */}
        <div className="flex flex-col gap-2">
          <label htmlFor="department" className="text-sm font-medium text-gray-700">
            Departamento
          </label>
          <Dropdown
            id="department"
            value={filters.department || null}
            onChange={(e) => handleDepartmentChange(e.value)}
            options={departmentOptions}
            placeholder="Todos"
            showClear
            className="w-full"
          />
        </div>

        {/* Data início */}
        <div className="flex flex-col gap-2">
          <label htmlFor="dateFrom" className="text-sm font-medium text-gray-700">
            Criado de
          </label>
          <Calendar
            id="dateFrom"
            value={filters.createdFrom ? new Date(filters.createdFrom) : null}
            onChange={(e) => handleDateFromChange(e.value as Date | null)}
            placeholder="Selecione"
            showIcon
            showButtonBar
            className="w-full"
          />
        </div>

        {/* Data fim */}
        <div className="flex flex-col gap-2">
          <label htmlFor="dateTo" className="text-sm font-medium text-gray-700">
            Criado até
          </label>
          <Calendar
            id="dateTo"
            value={filters.createdTo ? new Date(filters.createdTo) : null}
            onChange={(e) => handleDateToChange(e.value as Date | null)}
            placeholder="Selecione"
            showIcon
            showButtonBar
            className="w-full"
          />
        </div>
      </div>

      {/* Botão de reset */}
      {hasActiveFilters && (
        <div className="mt-4 flex justify-end">
          <Button
            label="Limpar Filtros"
            icon="pi pi-filter-slash"
            onClick={onReset}
            severity="secondary"
            outlined
            size="small"
          />
        </div>
      )}
    </div>
  );
}
