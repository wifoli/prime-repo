import { z } from 'zod';
import { cpf as cpfValidator } from 'cpf-cnpj-validator';
import { ValidationResult } from './types';

/**
 * CPF validation (accepts formatted or unformatted)
 */
export function cpf(value: string): ValidationResult {
  if (!value) {
    return { valid: true }; // Optional by default
  }

  const valid = cpfValidator.isValid(value);
  return {
    valid,
    error: valid ? undefined : 'CPF inválido',
  };
}

/**
 * Zod schema for CPF
 */
export const cpfSchema = z
  .string()
  .min(1, 'CPF é obrigatório')
  .refine((val) => cpfValidator.isValid(val), {
    message: 'CPF inválido',
  });

/**
 * Strip CPF formatting
 */
export function stripCPF(value: string): string {
  return cpfValidator.strip(value);
}
