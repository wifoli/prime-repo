import React, { useState, useEffect } from 'react';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { classNames } from 'primereact/utils';
import type { User, UserRole, CreateUserData, UpdateUserData } from '../types';

interface UserFormProps {
  visible: boolean;
  mode: 'create' | 'edit';
  user?: User | null;
  onHide: () => void;
  onSubmit: (data: CreateUserData | UpdateUserData) => Promise<void>;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  department: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  role?: string;
  department?: string;
}

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
 * Formulário de criação/edição de usuário
 */
export function UserForm({ visible, mode, user, onHide, onSubmit }: UserFormProps) {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    role: 'user',
    department: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Inicializa form com dados do usuário no modo edição
  useEffect(() => {
    if (mode === 'edit' && user) {
      setFormData({
        name: user.name,
        email: user.email,
        phone: user.phone || '',
        role: user.role,
        department: user.department || '',
      });
    } else {
      setFormData({
        name: '',
        email: '',
        phone: '',
        role: 'user',
        department: '',
      });
    }
    setErrors({});
  }, [mode, user, visible]);

  // Valida formulário
  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Nome é obrigatório';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email é obrigatório';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    if (formData.phone && !/^\+?[\d\s-()]+$/.test(formData.phone)) {
      newErrors.phone = 'Telefone inválido';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submete formulário
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);
    try {
      const data: CreateUserData = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim() || undefined,
        role: formData.role,
        department: formData.department.trim() || undefined,
      };

      await onSubmit(data);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Footer do dialog
  const footer = (
    <div className="flex justify-end gap-2">
      <Button
        label="Cancelar"
        icon="pi pi-times"
        onClick={onHide}
        severity="secondary"
        outlined
        disabled={isSubmitting}
      />
      <Button
        label={mode === 'create' ? 'Criar' : 'Salvar'}
        icon="pi pi-check"
        onClick={handleSubmit}
        loading={isSubmitting}
      />
    </div>
  );

  return (
    <Dialog
      visible={visible}
      onHide={onHide}
      header={mode === 'create' ? 'Novo Usuário' : 'Editar Usuário'}
      footer={footer}
      style={{ width: '500px' }}
      modal
      dismissableMask
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Nome */}
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="font-medium">
            Nome <span className="text-red-500">*</span>
          </label>
          <InputText
            id="name"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            className={classNames({ 'p-invalid': errors.name })}
            disabled={isSubmitting}
          />
          {errors.name && (
            <small className="text-red-500">{errors.name}</small>
          )}
        </div>

        {/* Email */}
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="font-medium">
            Email <span className="text-red-500">*</span>
          </label>
          <InputText
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
            className={classNames({ 'p-invalid': errors.email })}
            disabled={isSubmitting}
          />
          {errors.email && (
            <small className="text-red-500">{errors.email}</small>
          )}
        </div>

        {/* Telefone */}
        <div className="flex flex-col gap-2">
          <label htmlFor="phone" className="font-medium">
            Telefone
          </label>
          <InputText
            id="phone"
            value={formData.phone}
            onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
            className={classNames({ 'p-invalid': errors.phone })}
            placeholder="+55 11 99999-9999"
            disabled={isSubmitting}
          />
          {errors.phone && (
            <small className="text-red-500">{errors.phone}</small>
          )}
        </div>

        {/* Role */}
        <div className="flex flex-col gap-2">
          <label htmlFor="role" className="font-medium">
            Perfil <span className="text-red-500">*</span>
          </label>
          <Dropdown
            id="role"
            value={formData.role}
            onChange={(e) => setFormData(prev => ({ ...prev, role: e.value }))}
            options={roleOptions}
            disabled={isSubmitting}
          />
        </div>

        {/* Department */}
        <div className="flex flex-col gap-2">
          <label htmlFor="department" className="font-medium">
            Departamento
          </label>
          <Dropdown
            id="department"
            value={formData.department || null}
            onChange={(e) => setFormData(prev => ({ ...prev, department: e.value }))}
            options={departmentOptions}
            placeholder="Selecione um departamento"
            showClear
            disabled={isSubmitting}
          />
        </div>
      </form>
    </Dialog>
  );
}
